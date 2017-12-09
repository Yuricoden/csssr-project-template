export default class RangeSlider {
	constructor (parameters) {

		this._length = 3
		this.value = 0
		this.sliderID = document.querySelector('#' + parameters.containerSlider)
		this.sliderThumb = document.querySelector('.RangeSlider_Thumb')
		this.sliderTrack = document.querySelector('.RangeSlider_Track')
		this.sliderTrackFill = document.querySelector('.RangeSlider_TrackFill')
		this.clickArea = document.querySelector('.RangeSlider_ClickArea')
		this.sliderPoint = document.querySelectorAll('.RangeSlider_Point')

		this.init()
	}

	init () {
		this.clickarea()
		this.clickareaNew()
		this.sliderthumb()
		this.sliderthumbNew()
		this.sliderpoint()
		this.__defaultProperty()
	}

	_findValue (trackFill) {
		let value = Math.round((trackFill / this.sliderTrack.offsetWidth) * this._length)
		return value
	}

	_updateValue (newValue) {
		this.sliderPoint.forEach(function (item, index) {
			item.classList.remove('RangeSlider_PointActive');
		})
		this.sliderPoint[newValue].classList.add('RangeSlider_PointActive');
	}

	_updateTrackFill (newPosition) {
		newPosition = (newPosition / this._length * 100) + '%';
		$(this.sliderTrackFill).css('width', newPosition);
		console.log(newPosition)
	}



	imitateNewValue (XPosition) {
		this.sliderTrackFill.classList.add('RangeSlider_TrackFill-stopAnimation');
		if (XPosition > this.sliderTrack.offsetWidth) {
			XPosition = this.sliderTrack.offsetWidth
		}
		this.sliderTrackFill.style.width = XPosition + 'px'
	}

	_setupDrag (element, initialXPosition) {
		this.sliderTrackFill.classList.add('RangeSlider_TrackFill-stopAnimation')
		let trackWidth = this.sliderTrackFill.offsetWidth
		this.newValue = this._findValue(trackWidth)
		this._updateValue(this.newValue)
		$(element).on('mousemove', (function (event) {
			let newPosition = trackWidth + event.clientX - initialXPosition;
			this.imitateNewValue(newPosition)
			this.newValue = this._findValue(this.sliderTrackFill.offsetWidth / 4)
			this._updateValue(this.newValue)
		}).bind(this))
	}

	_finishDrag (element) {
		this.sliderTrackFill.classList.remove('RangeSlider_TrackFill-stopAnimation')
		$(element).off('mousemove')
		let newValue = this._findValue(parseInt(this.sliderTrackFill.offsetWidth))
		this.updateSliderValue(newValue)
	}

	updateSliderValue (newValue) {
		this._updateValue(newValue);
		this._updateTrackFill(newValue);
		this.value = newValue;
	}


	clickarea () {
		this.clickArea.addEventListener('mousedown', (function (event) {
			var target = event.target
			if (target.classList.contains('RangeSlider_Thumb')) {
				return false
			}

			this.imitateNewValue(event.offsetX)
			this._setupDrag(this.clickArea, event.clientX)
		}).bind(this),false)
	}

	clickareaNew () {
		this.clickArea.addEventListener('mouseup', (function (event) {
			this._finishDrag(this.clickArea)
		}).bind(this),false)
	}

	sliderpoint () {
		var self = this
		this.sliderPoint.forEach(function (item) {
			item.addEventListener('mousedown', (function (event) {
				event.stopPropagation()
				var XPos = $(this).position().left + ($(this).width() / 2);
				self.imitateNewValue(XPos);
				self._setupDrag.bind(this.clickArea, event.clientX);
			}))
		})
	}
	sliderthumb () {
		this.sliderThumb.addEventListener('mousedown', (function (event) {
			event.stopPropagation()
			this._setupDrag(this.sliderThumb, event.clientX)
		}).bind(this),false)
	}

	sliderthumbNew () {
		this.sliderThumb.addEventListener('mouseup', (event) => {
			this._finishDrag($(event.target))
		})
	}
	__defaultProperty (defaultCursor) {
		defaultCursor = '100%'
		$(this.sliderTrackFill).css('width', defaultCursor)
	}

}




