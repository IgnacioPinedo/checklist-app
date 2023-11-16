// Models
import Checklist from 'models/checklistModel';
import ChecklistSection from 'models/checklistSectionModel';
import ChecklistItem from 'models/checklistItemModel';

// Utils
import { validateChecklistBody } from 'utils/validation';

export async function getChecklists() {
  return (await Checklist.find({})).map((checklist) => {
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
}

export async function getChecklist(id) {
  let checklist = await Checklist.findById(id);

  if (!checklist)
    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this ID",
      },
    };

  checklist = checklist.toObject({
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  });

  let checklistSections = await ChecklistSection.find({ checklist: checklist.id }).sort({
    order: 'asc',
  });

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

  return checklist;
}

export async function createChecklist(body) {
  const validationError = validateChecklistBody(body);

  if (validationError != '')
    throw {
      internalError: true,
      status: 400,
      data: {
        error: validationError,
      },
    };

  const checklist = await Checklist.create({
    name: body.name,
  });

  await createChecklistSections(checklist.id, body.sections);
}

const createChecklistSections = async (id, sections) => {
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
};

export async function updateChecklist(id, body) {
  const validationError = validateChecklistBody(body);

  if (validationError != '')
    throw {
      internalError: true,
      status: 400,
      data: {
        error: validationError,
      },
    };

  const checklist = await Checklist.findById(id);

  if (!checklist)
    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this ID",
      },
    };

  checklist.name = body.name;

  await checklist.save();

  await deleteChecklistSections(checklist._id);

  await createChecklistSections(checklist.id, body.sections);
}

export async function deleteChecklist(id) {
  const checklist = await Checklist.findById(id);

  if (!checklist)
    throw {
      internalError: true,
      status: 404,
      data: {
        error: "There's no checklist with this ID",
      },
    };

  await deleteChecklistSections(checklist._id);

  await checklist.deleteOne();
}

const deleteChecklistSections = async (id) => {
  let checklistSections = await ChecklistSection.find({ checklist: id });

  await Promise.all(
    checklistSections.map(async (checklistSection) => {
      await ChecklistItem.deleteMany({
        checklistSection: checklistSection._id,
      });
    }),
  );

  await ChecklistSection.deleteMany({ checklist: id });
};
