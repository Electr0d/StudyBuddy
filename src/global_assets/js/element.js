function addElement(element, classE, id, onclickAction, text, parentE) {
  // if its an input, then its value, otherwise textContent
  let type = element == 'input' ? 'value' : 'textContent';
  let e = document.createElement(element);
  e.setAttribute('class', classE);
  e.setAttribute('id', id);
  if(onclickAction != undefined) e.setAttribute('onclick', onclickAction);
  e[type] = text;
  parentE.appendChild(e);
  return e;
}