const { unwatchFile } = require('fs');

function addSection(id, parent, title, important) {
  // create section
  let section = document.createElement('div');
  section.setAttribute('class', 'popup-section section');
  section.setAttribute('id', id + '-section');
  parent.appendChild(section);

  // create header
  let header = document.createElement('div');
  header.setAttribute('class', 'section-header');
  header.setAttribute('id', id + '-section-header');
  header.textContent = title;
  if(important) header.classList.add('important');
  section.appendChild(header);

  return section;
}

function addParameter(id, parent, text, type, onclick, on) {
	// create parameter
	var parameter = document.createElement('div');
	parameter.setAttribute('class', 'settings-parameter');
	parameter.setAttribute('id', 'parameter-' + id);
	parent.appendChild(parameter);

	// create text parameter
	var parameterText = document.createElement('span');
	parameterText.setAttribute('class', 'parameter-text');
	parameterText.setAttribute('id', 'parameter-text-' + id);
	parameterText.textContent = text.text;
	parameter.appendChild(parameterText);

	if (type == 'switch') {
		// create switch
		var switchElement = document.createElement('div');
		switchElement.setAttribute('class', 'switch-housing');
		switchElement.setAttribute('id', 'switch-' + id);
		switchElement.setAttribute('onclick', onclick);
		parameter.appendChild(switchElement);

		// create circle
		var circle = document.createElement('div');
		circle.setAttribute('class', 'switch-circle');
		circle.setAttribute('id', 'switch-' + id);
		switchElement.appendChild(circle);
		// if (data.users[data.users.currentUser].preferences[id] == on) tranformSwitch(circle);
	} else if (type == 'slider') {
		var parameterContainer = document.createElement('div');
		parameterContainer.setAttribute('class', 'parameter-container');
		parameterContainer.setAttribute('id', 'parameter-container-' + id);
		parameter.appendChild(parameterContainer);
		// create slider
		var slider = document.createElement('input');
		slider.setAttribute('class', 'slider');
		slider.setAttribute('type', 'range');
		slider.setAttribute('min', text.slider.min);
		slider.setAttribute('max', text.slider.max);
		slider.setAttribute('value', text.slider.value);
		slider.setAttribute('id', 'slider-' + id);
		slider.addEventListener('input', onclick);
		parameterContainer.appendChild(slider);
		
		// create input
		var input = document.createElement('input');
		input.setAttribute('class', 'slider-input');
		input.setAttribute('id', 'input-' + id);
		input.addEventListener('input', onclick);
		input.value = Math.round(text.slider.value);
		parameterContainer.appendChild(input);
	} else if (type == 'button') {
		var button = document.createElement('button');
		button.setAttribute('class', 'parameter-button');
		button.setAttribute('id', 'parameter-button-' + id);
		button.setAttribute('onclick', onclick);
		button.textContent = text.button.text;
		parameter.appendChild(button);

		// if its a text, then maximize parameter text
	} else if(type == 'paragraph') {
		parameterText.classList.add('parameter-maximize');

	}
	return parameter;
}