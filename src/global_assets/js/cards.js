function addCard(classList, id, title, parent) {
  let card = addElement('div', 'card ' + classList, id + '-card', undefined, undefined, parent);
  
  let titleSection = addElement('div', 'card-section card-section-title ' + classList, id + '-card-section-title', undefined, undefined, card);
  let titleP = addElement('div', 'card-title ' + classList, id + '-card-title', undefined, title, titleSection);
  
  let bodySection = addElement('div', 'card-section card-section-body ' + classList, id + '-card-section-body', undefined, undefined, card);
  return { card, bodySection };
}