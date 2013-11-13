function ContentObj(paramObj)
{
	this._linkObj = paramObj.linkObj;
	this._wrapperObj = paramObj.containerObj;
	this._html = paramObj.html;
	this._height = paramObj.height;
	this._ajaxLink = paramObj.link;
	this._loadNew = paramObj.loadNew;
	if(!this._loadNew && paramObj.html == ''){
		var $this = this;
		this._getContent(function(){
			$this._addEvent()
		});
	} else {
		this._addEvent();
	}
}
ContentObj.prototype = {
	_linkObj : {},
	_wrapperObj : {},
	_html : '',
	_height : '',
	_ajaxLink : '',
	_loadNew : '',
	_addEvent : function()
	{
		var $this = this;
		this._linkObj.bind('click', function(event){
			event.preventDefault();
			if($this._loadNew){
				$this._getContent(function() {
					$this._switchContent()
				});
			} else {
				$this._switchContent();
			}
		});
	},
	_switchContent: function()
	{
		var $this = this;
		if($this._height != ''){
			$this._wrapperObj.animate({'height': $this._height});
		}
		this._wrapperObj.fadeOut(500, function(){
			$this._wrapperObj.html($this._html);
			$this._wrapperObj.fadeIn(500, function(){
				$this._height = $this._wrapperObj.outerHeight();
				console.log($this._height)
			});
		});
	},
	_getContent: function(callback)
	{
		var $this = this;
		$.ajax({
			type: 'GET',
			url: $this._ajaxLink,
			data: '',
			success: function(data) {
				$this._html = data;
				callback(data);
			}
		});
	}
}
$.fn.extend({
	addAjaxContent: function(paramObj) {
		if(typeof(paramObj) == 'undefined' ){
			return 'paramObj = ' + typeof(paramObj);
		}
		if(typeof(paramObj.container) == 'undefined' ){
			return 'paramObj.container = ' + typeof(paramObj.container);
		}
		if(typeof(paramObj.link) == 'undefined' || paramObj.link == ''){
			paramObj.link = $(this)[0].href;
		}
		if(typeof(paramObj.html) == 'undefined'){
			paramObj.html = '';
		} else {
			paramObj.loadNew = false;
		}
		if(typeof(paramObj.loadNew) == 'undefined'){
			paramObj.loadNew = false;
		}
		if(typeof(paramObj.height) == 'undefined'){
			paramObj.height = '';
		}
		new ContentObj({
			linkObj : this,
			containerObj: paramObj.container,
			link : paramObj.link,
			loadNew : paramObj.loadNew,
			height : paramObj.height,
			html : paramObj.html
		});
		return true;
	}
});