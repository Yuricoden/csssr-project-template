import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import slider from './modules/slider-range'
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
      <div class="RangeSlider_Point RangeSlider_PointActive">
      <p>Не владею</p></div>
      <div class="RangeSlider_Point"><p>Использую готовые решения</p></div>
      <div class="RangeSlider_Point"><p>Использую готовые решения и умею их переделывать</p></div>
      <div class="RangeSlider_Point"><p>Пишу сложный JS с нуля</p></div>
    </div>
  </div>
</div>`


const point = document.querySelector('.RangeSlider_Thumb')
point.addEventListener('mousedown',function (event) {
	console.log('нажата')
})
point.addEventListener('mousemove',function (event) {
	console.log('поехали')
})
point.addEventListener('mouseup',function (event) {
	console.log('отпущена')
})

class RangeSlider {
	constructor (parameters) {
		var self = this
		this._length = 3
		this.value = 0
		this.sliderID = document.querySelector('#' + parameters.containerSlider)
		this.sliderThumb = document.querySelector('.RangeSlider_Thumb')
		this.sliderTrack = document.querySelector('.RangeSlider_Track')
		this.sliderTrackFill = document.querySelector('.RangeSlider_TrackFill')
		this.clickArea = document.querySelector('.RangeSlider_ClickArea')
		this.sliderPoint = document.querySelectorAll('.RangeSlider_Point')
	}



	_findValue (trackFill) {
		let value = Math.round((trackFill / this.sliderTrack.offsetWidth) * this._length)
		return value
	}

	_updateValue (newValue) {
		this.SliderPoints.classList.remove('RangeSlider_PointActive');
		this.sliderPoint[newValue].classList.add('RangeSlider_PointActive');
	}

	_updateTrackFill (newPosition) {
		newPosition = (newPosition / length * 100) + '%'
		this.sliderTrackFill.offsetWidth = newPosition
	}

	_setupDrag (element, initialXPosition) {
		this.sliderTrackFill.classList.add('RangeSlider_TrackFill-stopAnimation')
		let trackWidth = this.sliderTrackFill.offsetWidth //здесь может быть ошибка
		this.newValue = _findValue(trackWidth)
		_updateValue(this.newValue)

		element.addEventListener('mousemove', function (event) {
			let newPosition = trackWidth + event.clientX - initialXPosition;
			self.imitateNewValue(newPosition)

			this.newValue = _findValue(this.sliderTrackFill.offsetWidth / 4)
			_updateValue(this.newValue)
		})
	}

	_finishDrag (element) {
		this.sliderTrackFill.classList.remove('RangeSlider_TrackFill-stopAnimation')
		element.removeEventListener('mousemove')
		let newValue = _findValue(parseInt(this.sliderTrackFill.offsetWidth))
		self.updateSliderValue(newValue)
	}

	updateSliderValue = function (newValue) {
		_updateValue(newValue);
		_updateTrackFill(newValue);
		self.value = newValue;
		console.log('this.value = ', self.value);
	}

	/* method to imitate new value without animation */
	imitateNewValue = function (XPosition) {
		this.sliderTrackFill.addClass('RangeSlider_TrackFill-stopAnimation');
		if (XPosition > this.sliderTrack.offsetWidth) {
			XPosition = this.sliderTrack.offsetWidth
		}
		this.sliderTrackFill.style.width = XPosition + 'px'
	}
	clickarea = function () {
		clickArea.addEventListener('mousedown', function (event) {
			var target = event.target
			if (target.classList.contains('RangeSlider_Thumb')) {
				return false
			}
			self.imitateNewValue(event.offsetX)
			_setupDrag(this, event.clientX)
		})
	}
	clickareaNew = function () {
		clickArea.addEventListener('mouseup', function (event) {
			console.log('"$ClickArea" calling "finishDrag"');
			_finishDrag(this)
		})
	}

	sliderthumb = function () {
		sliderThumb.addEventListener('mousedown', function (event) {
			event.stopPropagation()
			_setupDrag(this, event.clientX)
		})
	}
	sliderthumbNew = function () {
		sliderThumb.addEventListener('mouseup', function (event) {
			console.log('"$SliderThumnb" calling "finishDrag"');
			_finishDrag(this, event.clientX)
		})
	}

}




const range = new RangeSlider({
	  containerSlider: 'RangeSlider'
})
