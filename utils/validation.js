export function validateChecklistBody(body) {
  if (!body.name || body.name == '') return 'A checklist needs a name';

  if (!body.sections || body.sections.length == 0) return 'A checklist needs at least one section';

  if (
    body.sections
      .map((section) => section.order)
      .filter((order, index, self) => self.indexOf(order) === index).length != body.sections.length
  )
    return 'A checklist needs unique section orders';

  for (const section of body.sections) {
    const validationError = validateChecklistSection(section);

    if (validationError != '') return validationError;
  }

  return '';
}

const validateChecklistSection = (section) => {
  if (!section.name || section.name == '') return 'A checklist section needs a name';

  if (section.order == undefined || section.order == null || section.order < 0)
    return 'A checklist section needs an order';

  if (!section.items || section.items.length == 0)
    return 'A checklist section needs at least one item';

  if (
    section.items
      .map((item) => item.order)
      .filter((order, index, self) => self.indexOf(order) === index).length != section.items.length
  )
    return 'A checklist section needs unique item orders';

  for (const item of section.items) {
    const validationError = validateChecklistItem(item);

    if (validationError != '') return validationError;
  }

  return '';
};

const validateChecklistItem = (item) => {
  if (!item.name || item.name == '') return 'A checklist item needs a name';

  if (item.order == undefined || item.order == null || item.order < 0)
    return 'A checklist item needs an order';

  return '';
};
