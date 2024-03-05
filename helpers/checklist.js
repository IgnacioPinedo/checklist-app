// Models
import Checklist from 'models/checklistModel';
import ChecklistSection from 'models/checklistSectionModel';
import ChecklistItem from 'models/checklistItemModel';

// Utils
import { validateChecklistBody } from 'utils/validation';

export async function getChecklists() {
  console.log('getChecklists');

  console.log('Fetching checklists');

  const checklists = await Checklist.find({});

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

export async function getChecklist(id) {
  console.log('getChecklist');

  console.log('Fetching checklist');

  let checklist = await Checklist.findById(id);

  if (!checklist) {
    console.log(`There's no checklist with this ID`);

    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this ID",
      },
    };
  }

  console.log(`Fetched checklist with ID ${id}, transforming`)

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

  console.log('Validated body, creating checklist');

  const checklist = await Checklist.create({
    name: body.name,
  });

  console.log('Created checklist, creating sections');

  await createChecklistSections(checklist.id, body.sections);

  console.log('Created sections');

  return checklist.id;
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
            checklistSection: checklistSection.id,
          });
        }),
      );
    }),
  );

  console.log('Created sections');
};

export async function updateChecklist(id, body) {
  console.log('updateChecklist');

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

  const checklist = await Checklist.findById(id);

  if (!checklist) {
    console.log(`There's no checklist with this ID`);

    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this ID",
      },
    };
  }

  console.log('Fetched checklist, updating');

  checklist.name = body.name;

  await checklist.save();

  console.log('Updated checklist, deleting sections');

  await deleteChecklistSections(checklist._id);

  console.log('Deleted sections, creating sections');

  await createChecklistSections(checklist.id, body.sections);

  console.log('Created sections');
}

export async function deleteChecklist(id) {
  console.log('deleteChecklist');

  console.log('Fetching checklist');

  const checklist = await Checklist.findById(id);

  if (!checklist) {
    console.log(`There's no checklist with this ID`);

    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this ID",
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

export async function duplicateChecklist(id) {
  console.log('duplicateChecklist');

  console.log('Fetching checklist');

  const checklist = await Checklist.findById(id);

  if (!checklist) {
    console.log(`There's no checklist with this ID`);

    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this ID",
      },
    };
  }

  console.log('Fetched checklist, duplicating checklist');

  const newChecklist = await Checklist.create({
    name: `${checklist.name} (Copy)`,
  });

  console.log('Duplicated checklist, fetching sections to duplicate');

  const checklistSections = await ChecklistSection.find({ checklist: checklist.id }).sort({
    order: 'asc',
  });

  console.log(`Fetched ${checklistSections.length} sections, duplicating`);

  await Promise.all(
    checklistSections.map(async (checklistSection) => {
      const newChecklistSection = await ChecklistSection.create({
        name: checklistSection.name,
        order: checklistSection.order,
        checklist: newChecklist.id,
      });

      const checklistItems = await ChecklistItem.find({
        checklistSection: checklistSection.id,
      }).sort({ order: 'asc' });

      await Promise.all(
        checklistItems.map(async (checklistItem) => {
          await ChecklistItem.create({
            name: checklistItem.name,
            order: checklistItem.order,
            checklistSection: newChecklistSection.id,
          });
        }),
      );
    }),
  );

  console.log('Duplicated sections');

  return newChecklist.id;
}
