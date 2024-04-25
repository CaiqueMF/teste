import * as joint from "jointjs/dist/joint";
import _ from "lodash";

const uml = joint.shapes.uml;

uml.Class = joint.shapes.basic.Generic.extend({

    markup: [
        '<g class="rotatable">',
        '<g class="scalable">',
        '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/>',
        '</g>',
        '<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/>',
        '</g>'
    ].join(''),

    defaults: _.defaultsDeep({

        type: 'uml.Class',

        attrs: {
            rect: { 'width': 200 },

            '.uml-class-name-rect': { 'stroke': 'black', 'stroke-width': 0.5, 'stroke-dasharray': 0, 'fill': '#3498db' },
            '.uml-class-attrs-rect': { 'stroke': 'black', 'stroke-width': 0.5, 'stroke-dasharray': 0, 'fill': '#fff' },
            '.uml-class-methods-rect': { 'stroke': 'black', 'stroke-width': 0.5, 'stroke-dasharray': 0, 'fill': '#fff' },

            '.uml-class-name-text': {
                'ref': '.uml-class-name-rect', 'ref-y': .5, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'middle', 'font-weight': 'bold',
                'fill': 'black', 'font-size': 12, 'font-family': 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
            },
            '.uml-class-attrs-text': {
                'ref': '.uml-class-attrs-rect', 'ref-y': 5, 'ref-x': 5,
                'fill': 'black', 'font-size': 12, 'font-family': 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
            },
            '.uml-class-methods-text': {
                'ref': '.uml-class-methods-rect', 'ref-y': 5, 'ref-x': 5,
                'fill': 'black', 'font-size': 12, 'font-family': 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
            }
        },
        titular: false,
        name: [],
        attributes: [],
        methods: [],
        objects: []

    }, joint.shapes.basic.Generic.prototype.defaults),

    initialize: function () {

        this.on('change:name change:attributes change:methods', function () {
            this.updateRectangles();
            this.trigger('uml-update');
        }, this);

        this.updateRectangles();

        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },

    getClassName: function () {
        return this.get('name');
    },

    addAttribute: function (obj) {
        let pkFkName = "";
        if(obj.PK || obj.FK){
            pkFkName = ":"
        }
        if (obj.PK) {
            pkFkName = pkFkName + " PK";
        }

        if (obj.FK) {
            pkFkName = pkFkName + " FK";
        }
        obj.name = obj.name + pkFkName
        let lgpdText = " "
        for(let i = 2; i>=0; i--){
			if(obj.lgpd[i]){
				switch(i){
					case 2:
						lgpdText+="[A]";
						break;
					case 1:
						lgpdText+="[S]";
						break;
					case 0:
						lgpdText+="[P]";
					break;				
				}
			break;
			}
		}
		for(let j = 3; j < obj.lgpd.length; j++){
			if(obj.lgpd[j]){
				switch(j){
					case 3:
						lgpdText+="[C]";
						break;
					case 4:
						lgpdText+="[CS]"
						break;
					case 5:
						lgpdText+="[APC]"
						break;
					case 6:
						lgpdText+="[F]"
						break;
					case 7:
						lgpdText+="[CP]"
						break;
					case 8:
						lgpdText+="[CA]"
						break;
					case 9:
						lgpdText+="[I]"
						break;
					case 10:
						lgpdText+="[SI]"
						break;
				}
			}
		}
        obj.name = obj.name + lgpdText;
        this.get('attributes').push(obj.name);
        this.get('objects').push(obj);
        this.updateRectangles();
        this.trigger('uml-update');
    },

    deleteColumn: function (index) {
        this.get('attributes').splice(index, 1);
        this.get('objects').splice(index, 1);
        this.updateRectangles();
        this.trigger('uml-update');
    },

    editColumn: function (index, name, object) {
        this.get('attributes')[index] = name;
        this.get('objects')[index] = object;
        this.updateRectangles();
        this.trigger('uml-update');
    },

    updateRectangles: function () {

        var attrs = this.get('attrs');

        var rects = [
            { type: 'name', text: this.getClassName() },
            { type: 'attrs', text: this.get('attributes') },
            { type: 'methods', text: this.get('methods') }
        ];

        var offsetY = 0;

        _.each(rects, function (rect) {

            var lines = _.isArray(rect.text) ? rect.text : [rect.text];
            var rectHeight = lines.length * 20 + 20;

            attrs['.uml-class-' + rect.type + '-text'].text = lines.join('\n');
            attrs['.uml-class-' + rect.type + '-rect'].height = rectHeight;
            attrs['.uml-class-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

            offsetY += rectHeight;
        });

    },

    getType: function() {
        return "Class"
    }

});

uml.Abstract = joint.shapes.basic.Generic.extend({

    markup: [
        '<g class="rotatable">',
        '<g class="scalable">',
        '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/>',
        '</g>',
        '<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/>',
        '</g>'
    ].join(''),

    defaults: _.defaultsDeep({

        type: 'uml.Abstract',

        attrs: {
            rect: { 'width': 200 },

            '.uml-class-name-rect': { 'stroke': 'black', 'stroke-width': 0.5, 'fill': 'lightgray' },
            '.uml-class-attrs-rect': { 'stroke': 'black', 'stroke-width': 0.5, 'fill': '#fff' },
            '.uml-class-methods-rect': { 'stroke': 'black', 'stroke-width': 0.5, 'fill': '#fff' },

            '.uml-class-name-text': {
                'ref': '.uml-class-name-rect', 'ref-y': .5, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'middle', 'font-weight': 'bold',
                'fill': 'black', 'font-size': 12, 'font-family': 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
            },
            '.uml-class-attrs-text': {
                'ref': '.uml-class-attrs-rect', 'ref-y': 5, 'ref-x': 5,
                'fill': 'black', 'font-size': 12, 'font-family': 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
            },
            '.uml-class-methods-text': {
                'ref': '.uml-class-methods-rect', 'ref-y': 5, 'ref-x': 5,
                'fill': 'black', 'font-size': 12, 'font-family': 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
            }
        },

        name: [],
        attributes: [],
        methods: [],
        objects: []

    }, joint.shapes.basic.Generic.prototype.defaults),

    initialize: function () {

        this.on('change:name change:attributes change:methods', function () {
            this.updateRectangles();
            this.trigger('uml-update');
        }, this);

        this.updateRectangles();

        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },

    getClassName: function () {
        return this.get('name');
    },

    saveView: function (view) {
        this.set('attributes', view.columns.map(column => column.name));
        this.set('objects', view.basedIn);
        this.set('queryConditions', view.queryConditions);
        this.updateRectangles();
        this.trigger('uml-update');
    },

    addAttributes: function (objects) {
        objects.forEach(({ name }) => this.get('attributes').push(name));
        this.get('objects').push(objects);
        this.updateRectangles();
        this.trigger('uml-update');
    },

    updateRectangles: function () {

        var attrs = this.get('attrs');

        var rects = [
            { type: 'name', text: this.getClassName() },
            { type: 'attrs', text: this.get('attributes') },
            { type: 'methods', text: this.get('methods') }
        ];

        var offsetY = 0;

        _.each(rects, function (rect) {

            var lines = _.isArray(rect.text) ? rect.text : [rect.text];
            var rectHeight = lines.length * 20 + 20;

            attrs['.uml-class-' + rect.type + '-text'].text = lines.join('\n');
            attrs['.uml-class-' + rect.type + '-rect'].height = rectHeight;
            attrs['.uml-class-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

            offsetY += rectHeight;
        });

    },

    getType: function() {
        return "View"
    }

});

uml.ClassView = joint.dia.ElementView.extend({
    initialize: function () {
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.model, 'uml-update', function () {
            this.update();
            this.resize();
        });
    }
});

export default uml;
