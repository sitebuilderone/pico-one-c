CNVS.RevealBox = function() {
	var __core = SEMICOLON.Core;

	var _bindings = new WeakMap();
	var _hoverCapable = !window.matchMedia || window.matchMedia('(hover: hover) and (pointer: fine)').matches;

	var _group = function(el) {
		return el.closest('[data-reveal-box-group]');
	};

	var _clearGroup = function(el) {
		var group = _group(el);
		if( !group ) return;
		group.querySelectorAll('.is-active').forEach( function(other) {
			if( other !== el ) other.classList.remove('is-active');
		});
	};

	var _setState = function(el, active) {
		el.classList.toggle('is-active', active);
		if( el.hasAttribute('aria-expanded') ) el.setAttribute('aria-expanded', active ? 'true' : 'false');
	};

	var _activate = function(el) {
		_clearGroup(el);
		_setState(el, true);
	};

	var _toggle = function(el) {
		if( el.classList.contains('is-active') ) {
			_setState(el, false);
		} else {
			_activate(el);
		}
	};

	var _initGroups = function() {
		document.querySelectorAll('[data-reveal-box-group]').forEach( function(group) {
			if( group.dataset.revealBoxGroupReady ) return;
			group.dataset.revealBoxGroupReady = '1';

			var initial = group.querySelector('[data-reveal-box-default]');
			if( !initial ) return;

			initial.classList.add('is-active');
			if( !_hoverCapable ) return;

			var release = function() {
				initial.classList.remove('is-active');
				group.removeEventListener('pointerenter', release);
			};
			group.addEventListener('pointerenter', release);
		});
	};

	return {
		init: function(selector) {
			if( __core.getSelector(selector, false, false).length < 1 ){
				return true;
			}

			__core.initFunction({ class: 'has-plugin-revealbox', event: 'pluginRevealBoxReady' });

			selector = __core.getSelector( selector, false );
			if( selector.length < 1 ) return true;

			selector.forEach( function(el) {
				var prev = _bindings.get(el);
				if( prev ) {
					el.removeEventListener('click', prev.click);
					el.removeEventListener('keydown', prev.keydown);
					el.removeEventListener('focus', prev.focus);
					el.removeEventListener('blur', prev.blur);
				}

				var toggleable = el.hasAttribute('data-reveal-box-toggle') || !_hoverCapable;

				if( !el.hasAttribute('tabindex') && el.tagName !== 'A' && el.tagName !== 'BUTTON' ) {
					el.setAttribute('tabindex', '0');
				}

				if( toggleable && !el.hasAttribute('aria-expanded') ) {
					el.setAttribute('aria-expanded', el.classList.contains('is-active') ? 'true' : 'false');
				}

				var clickHandler = function(e) {
					if( !toggleable ) return;
					var interactive = e.target.closest('a, button');
					if( interactive && interactive !== el ) return;
					e.preventDefault();
					_toggle(el);
				};

				var keydownHandler = function(e) {
					if( e.key === 'Enter' || e.key === ' ' ) {
						if( !toggleable ) return;
						e.preventDefault();
						_toggle(el);
					} else if( e.key === 'Escape' ) {
						_setState(el, false);
						el.blur();
					}
				};

				var focusHandler = function() { if( _hoverCapable && !toggleable ) _activate(el); };
				var blurHandler  = function() { if( _hoverCapable && !toggleable ) _setState(el, false); };

				el.addEventListener('click', clickHandler);
				el.addEventListener('keydown', keydownHandler);
				el.addEventListener('focus', focusHandler);
				el.addEventListener('blur', blurHandler);

				_bindings.set(el, { click: clickHandler, keydown: keydownHandler, focus: focusHandler, blur: blurHandler });
			});

			_initGroups();
		}
	};
}();
