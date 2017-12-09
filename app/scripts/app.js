import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import slider from './modules/slider-range';
const aboutme  = require ("../blocks/about__data/" + getVersion('ru'))
const anketaEN  = require ("../blocks/about__data/" + getVersion('en'))
const inputContainer = document.querySelector('.yuriz__history');
const inputs = document.querySelectorAll('.story__to-yourself')
$(() => {
	svg4everybody();
});

const sliderTemplate = document.querySelector('.slider__skill')
sliderTemplate.innerHTML = `
 <div class="RangeSlider" id="RangeSlider">
  <div class="RangeSlider_ClickArea">
    <div class="RangeSlider_Track">
      <div class="RangeSlider_TrackFill">
        <div class="RangeSlider_Thumb"></div>
      </div>
    </div><!-- /.RangeSlider_Track -->
    <div class="RangeSlider_Points">
      <div class="RangeSlider_Point">
      <p>Не владею</p></div>
      <div class="RangeSlider_Point"><p>Использую готовые решения</p></div>
      <div class="RangeSlider_Point"><p>Использую готовые решения и умею их переделывать</p></div>
      <div class="RangeSlider_Point RangeSlider_PointActive"><p>Пишу сложный JS с нуля</p></div>
    </div>
  </div>
</div>`

new slider({
	containerSlider: 'RangeSlider'
})

window.addEventListener('load',function (event) {
	addValue(aboutme)
	getAboutData(aboutme)
})

document.querySelector('.button').addEventListener('click',function (event) {
	if(this.classList.contains('active')) {
		window.location.reload()
	}
	addValue(anketaEN)
	if(inputContainer.childNodes.length) {
		updateInputs(inputContainer)
		getAboutData(anketaEN)
		addClassEN(inputContainer)
	}
	this.classList.add('active')
})


inputContainer.addEventListener('input', function(e) {
	e = event.target
	if (e.value.length == e.getAttribute('maxlength')) {
		creatingInput(this,e)
	}
})
inputContainer.addEventListener('blur',function (event) {
	if(event.target.value == '') {
		if (inputs.length > 1) {
			return this.removeChild(event.target)
		}
	}
},true)

document.querySelectorAll('.story__to-yourself').forEach(function (item) {
	item.addEventListener('keyup',function () {
		var $this = $(this);
		if($this.val().length >= 55)
			$this.val($this.val().substr(0, 55))
	})
})

function getAboutData (dataInput) {
	let substr;
	for(var i = 0; i < dataInput.me.length;i++) {
		if(dataInput.me.length > 55) {
			substr = dataInput.me.match(/(.{1,55})/gim) || ''
		}
	}
	substr.forEach(function (item) {
		createInputJson(item)
	})
}

function getVersion (ver) {
	return `about_me-${ver}.json`
}

function getValue (val) {
	return document.querySelectorAll('.item__input-about')[val]
}

function addClassEN (nodes) {
	nodes.childNodes.forEach(function (item) {
		item.classList.toggle('active')
	})
}

function addValue (version) {
	var userData = version.user__data
	getValue(0).value = userData.fullname
	getValue(1).value = userData.date_birthday
	getValue(2).value = userData.location
	getValue(3).value = userData.skype
	getValue(4).value = userData.email
}

function createInputJson (data) {
	let input = document.createElement('input')
	input.type = 'text'
	input.value = data
	input.maxLength = '55'
	input.className = 'story__to-yourself'
	inputContainer.appendChild(input)
}

function creatingInput (element,target) {
	var newInput = target.cloneNode()
	newInput.value = ''
	element.appendChild(newInput)
	return newInput.focus()
}

function updateInputs (node) {
	let children = node.childNodes
	while(children.length) {
		node.removeChild(children[0])
	}
}

