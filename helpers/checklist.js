// Models
import Checklist from 'models/checklistModel';
import ChecklistSection from 'models/checklistSectionModel';
import ChecklistItem from 'models/checklistItemModel';

// Utils
import { validateChecklistBody } from 'utils/validation';

// Packages
import slugify from 'slugify';
import mongoose from 'mongoose';

export async function getChecklists(sort_by = 'createdAt', order_by = 'asc') {
  console.log('getChecklists');

  console.log('Fetching checklists');

  const checklists = await Checklist.find({}).sort({
    [sort_by]: order_by,
  });

  console.log(`Fetched ${checklists.length} checklists, transforming`);

  const transformedChecklists = checklists.map((checklist) => {
    return checklist.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    });
  });

  console.log('Transformed checklists');

  return transformedChecklists;
}

export async function getChecklistBySlug(slug) {
  console.log('getChecklistBySlug');

  console.log('Fetching checklist');

  let checklist = await Checklist.findOne({ slug });

  if (!checklist) {
    console.log(`There's no checklist with this slug`);

    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this slug",
      },
    };
  }

  console.log(`Fetched checklist with slug ${checklist.slug}, transforming`);

  checklist = checklist.toObject({
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  });

  console.log('Transformed checklist, fetching sections');

  let checklistSections = await ChecklistSection.find({ checklist: checklist.id }).sort({
    order: 'asc',
  });

  console.log(`Fetched ${checklistSections.length} sections, transforming`);

  checklist.sections = await Promise.all(
    checklistSections.map(async (checklistSection) => {
      checklistSection = checklistSection.toObject({
        versionKey: false,
        transform: (doc, ret) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.checklist;
          delete ret.createdAt;
          delete ret.updatedAt;
        },
      });

      const checklistItems = await ChecklistItem.find({
        checklistSection: checklistSection.id,
      }).sort({ order: 'asc' });

      checklistSection.items = checklistItems.map((item) => {
        return item.toObject({
          versionKey: false,
          transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.checklistSection;
            delete ret.createdAt;
            delete ret.updatedAt;
          },
        });
      });

      return checklistSection;
    }),
  );

  console.log('Transformed sections');

  return checklist;
}

export async function createChecklist(body) {
  console.log('createChecklist');

  console.log('Validating body');

  const validationError = validateChecklistBody(body);

  if (validationError != '') {
    console.log('Validation error');

    throw {
      internalError: true,
      status: 400,
      data: {
        error: validationError,
      },
    };
  }

  const slug = slugify(body.name, {
    lower: true,
    strict: true,
  });

  const conflictingSlug = await Checklist.findOne({ slug: slug });

  if (conflictingSlug) {
    console.log('Conflicting slug');

    throw {
      internalError: true,
      status: 400,
      data: {
        error: 'There is already a checklist with this name',
      },
    };
  }

  console.log('Validated body, creating checklist');

  const checklist = await Checklist.create({
    name: body.name,
    slug: slug,
  });

  console.log('Created checklist, creating sections');

  await createChecklistSections(checklist._id, body.sections);

  console.log('Created sections');

  return checklist.slug;
}

const createChecklistSections = async (id, sections) => {
  console.log('createChecklistSections');

  console.log('Creating sections');

  await Promise.all(
    sections.map(async (section) => {
      const checklistSection = await ChecklistSection.create({
        name: section.name,
        order: section.order,
        checklist: id,
      });

      await Promise.all(
        section.items.map(async (item) => {
          return await ChecklistItem.create({
            name: item.name,
            order: item.order,
            checklistSection: checklistSection._id,
          });
        }),
      );
    }),
  );

  console.log('Created sections');
};

export async function updateChecklistBySlug(slug, body) {
  console.log('updateChecklistBySlug');

  console.log('Validating body');

  const validationError = validateChecklistBody(body);

  if (validationError != '') {
    console.log('Validation error');

    throw {
      internalError: true,
      status: 400,
      data: {
        error: validationError,
      },
    };
  }

  console.log('Validated body, fetching checklist');

  const checklist = await Checklist.findOne({ slug });

  if (!checklist) {
    console.log(`There's no checklist with this slug`);

    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this slug",
      },
    };
  }

  console.log('Fetched checklist, updating');

  const updatedSlug = slugify(body.name, {
    lower: true,
    strict: true,
  });

  const conflictingSlug = await Checklist.findOne({
    slug: updatedSlug,
    _id: { $ne: checklist._id },
  });

  if (conflictingSlug) {
    console.log('Conflicting slug');

    throw {
      internalError: true,
      status: 400,
      data: {
        error: 'There is already a checklist with this name',
      },
    };
  }

  checklist.name = body.name;
  checklist.slug = updatedSlug;

  await checklist.save();

  console.log('Updated checklist, deleting sections');

  await deleteChecklistSections(checklist._id);

  console.log('Deleted sections, creating sections');

  await createChecklistSections(checklist._id, body.sections);

  console.log('Created sections');
}

export async function deleteChecklistBySlug(slug) {
  console.log('deleteChecklistBySlug');

  console.log('Fetching checklist');

  const checklist = await Checklist.findOne({ slug });

  if (!checklist) {
    console.log(`There's no checklist with this slug`);

    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this slug",
      },
    };
  }

  console.log('Fetched checklist, deleting sections');

  await deleteChecklistSections(checklist._id);

  console.log('Deleted sections, deleting checklist');

  await checklist.deleteOne();

  console.log('Deleted checklist');
}

const deleteChecklistSections = async (id) => {
  console.log('deleteChecklistSections');

  console.log('Fetching sections');

  let checklistSections = await ChecklistSection.find({ checklist: id });

  console.log(`Fetched ${checklistSections.length} sections, deleting items`);

  await Promise.all(
    checklistSections.map(async (checklistSection) => {
      await ChecklistItem.deleteMany({
        checklistSection: checklistSection._id,
      });
    }),
  );

  console.log('Deleted items, deleting sections');

  await ChecklistSection.deleteMany({ checklist: id });

  console.log('Deleted sections');
};

export async function duplicateChecklistBySlug(slug) {
  console.log('duplicateChecklistBySlug');

  console.log('Fetching checklist');

  const checklist = await Checklist.findOne({ slug });

  if (!checklist) {
    console.log(`There's no checklist with this slug`);

    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this slug",
      },
    };
  }

  console.log('Fetched checklist, duplicating checklist');

  const copyName = `${checklist.name} (Copy)`;
  const copySlug = slugify(copyName, {
    lower: true,
    strict: true,
  });

  const conflictingSlug = await Checklist.findOne({
    slug: copySlug,
    _id: { $ne: checklist._id },
  });

  if (conflictingSlug) {
    console.log('Conflicting slug');

    throw {
      internalError: true,
      status: 400,
      data: {
        error: 'There is already a checklist with this name',
      },
    };
  }

  const newChecklist = await Checklist.create({
    name: copyName,
    slug: copySlug,
  });

  console.log('Duplicated checklist, fetching sections to duplicate');

  const checklistSections = await ChecklistSection.find({ checklist: checklist._id }).sort({
    order: 'asc',
  });

  console.log(`Fetched ${checklistSections.length} sections, duplicating`);

  await Promise.all(
    checklistSections.map(async (checklistSection) => {
      const newChecklistSection = await ChecklistSection.create({
        name: checklistSection.name,
        order: checklistSection.order,
        checklist: newChecklist._id,
      });

      const checklistItems = await ChecklistItem.find({
        checklistSection: checklistSection._id,
      }).sort({ order: 'asc' });

      await Promise.all(
        checklistItems.map(async (checklistItem) => {
          await ChecklistItem.create({
            name: checklistItem.name,
            order: checklistItem.order,
            checklistSection: newChecklistSection._id,
          });
        }),
      );
    }),
  );

  console.log('Duplicated sections');

  return newChecklist._id;
}
