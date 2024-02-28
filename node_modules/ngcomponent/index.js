"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assign = require("lodash/assign");
var mapValues = require("lodash/mapValues");
var some = require("lodash/some");
var NgComponent = /** @class */ (function () {
    function NgComponent() {
        this.__isFirstRender = true;
        this.state = {};
        this.props = {};
    }
    /*
      eg. {
        as: {currentValue: [1, 2, 3], previousValue: [1, 2]},
        bs: {currentValue: 42, previousValue: undefined}
      }
    */
    // nb: this method is explicity exposed for unit testing
    NgComponent.prototype.$onChanges = function (changes) {
        var oldProps = this.props;
        // TODO: fix Lodash typings upstream
        var newProps = mapValues(changes, 'currentValue');
        // TODO: implement nextState (which also means implement this.setState)
        var nextProps = assign({}, this.props, newProps);
        if (this.__isFirstRender) {
            assign(this, { props: nextProps });
            this.componentWillMount();
            this.render();
            this.__isFirstRender = false;
        }
        else {
            if (!this.didPropsChange(newProps, oldProps))
                return;
            this.componentWillReceiveProps(nextProps);
            var shouldUpdate = this.shouldComponentUpdate(nextProps, this.state);
            assign(this, { props: nextProps });
            if (!shouldUpdate)
                return;
            this.componentWillUpdate(this.props, this.state);
            this.render();
            this.componentDidUpdate(this.props, this.state);
        }
    };
    NgComponent.prototype.$postLink = function () {
        this.componentDidMount();
    };
    NgComponent.prototype.$onDestroy = function () {
        this.componentWillUnmount();
    };
    NgComponent.prototype.didPropsChange = function (newProps, oldProps) {
        return some(newProps, function (v, k) { return v !== oldProps[k]; });
    };
    /*
      lifecycle hooks
    */
    NgComponent.prototype.componentWillMount = function () { };
    NgComponent.prototype.componentDidMount = function () { };
    NgComponent.prototype.componentWillReceiveProps = function (_props) { };
    NgComponent.prototype.shouldComponentUpdate = function (_nextProps, _nextState) { return true; };
    NgComponent.prototype.componentWillUpdate = function (_props, _state) { };
    NgComponent.prototype.componentDidUpdate = function (_props, _state) { };
    NgComponent.prototype.componentWillUnmount = function () { };
    NgComponent.prototype.render = function () { };
    return NgComponent;
}());
exports.default = NgComponent;
//# sourceMappingURL=index.js.map