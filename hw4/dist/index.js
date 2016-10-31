'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React,
    Component = _React.Component;

var TodoApp = function (_Component) {
  _inherits(TodoApp, _Component);

  function TodoApp(props) {
    _classCallCheck(this, TodoApp);

    var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

    _this.state = {
      todoCount: 0,
      items: [],
      inputValue: ''
    };
    _this.onEnter = _this.onEnter.bind(_this);
    return _this;
  }

  _createClass(TodoApp, [{
    key: 'onEnter',
    value: function onEnter(event) {
      if (event.keyCode === 13 && event.target.value !== '') {
        this.setState({
          todoCount: this.state.todoCount + 1,
          items: this.state.items.concat([{
            content: event.target.value,
            completed: ''
          }])
        });
        console.log('New todo \'' + event.target.value + '\' added.');
        event.target.value = '';
      }
    }
  }, {
    key: 'changeCompleted',
    value: function changeCompleted(index) {
      this.setState(function (state) {
        var item = state.items[index];
        if (item.completed === '') {
          item.completed = 'completed';
          state.todoCount -= 1;
        } else {
          item.completed = '';
          state.todoCount += 1;
        }
        return state;
      });
    }
  }, {
    key: 'destroyItem',
    value: function destroyItem(index) {
      this.setState(function (state) {
        if (state.items[index].completed === '') {
          state.todoCount -= 1;
        }
        state.items.splice(index, 1);
        return state;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'section',
        { className: 'todoapp' },
        React.createElement(
          'header',
          { className: 'header' },
          React.createElement(
            'h1',
            null,
            'todos'
          ),
          React.createElement('input', {
            className: 'new-todo',
            placeholder: 'What needs to be done?',
            onKeyDown: this.onEnter })
        ),
        React.createElement(
          'section',
          { className: 'main' },
          React.createElement('input', { className: 'toggle-all', type: 'checkbox' }),
          React.createElement(
            'label',
            { htmlFor: 'toggle-all' },
            'Mark all as complete>'
          ),
          React.createElement(
            'ul',
            { className: 'todo-list' },
            this.state.items.map(function (item, key) {
              return React.createElement(TodoItem, {
                content: item.content,
                key: key,
                completed: item.completed,
                changeCompleted: function changeCompleted() {
                  return _this2.changeCompleted(key);
                },
                destroyItem: function destroyItem() {
                  return _this2.destroyItem(key);
                }
              });
            })
          )
        ),
        React.createElement(Footer, { count: this.state.todoCount })
      );
    }
  }]);

  return TodoApp;
}(Component);

var Footer = function (_Component2) {
  _inherits(Footer, _Component2);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'footer',
        { className: 'footer' },
        React.createElement(
          'span',
          { className: 'todo-count' },
          this.props.count,
          ' item(s) left'
        ),
        React.createElement(
          'button',
          { className: 'clear-completed' },
          'Clear completed'
        )
      );
    }
  }]);

  return Footer;
}(Component);

var TodoItem = function (_Component3) {
  _inherits(TodoItem, _Component3);

  function TodoItem() {
    _classCallCheck(this, TodoItem);

    return _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).apply(this, arguments));
  }

  _createClass(TodoItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          completed = _props.completed,
          changeCompleted = _props.changeCompleted,
          content = _props.content,
          destroyItem = _props.destroyItem;

      var isChecked = completed ? true : false;
      return React.createElement(
        'div',
        { className: 'view' },
        React.createElement(
          'li',
          { className: completed },
          React.createElement('input', {
            className: 'toggle',
            type: 'checkbox',
            onChange: changeCompleted,
            checked: isChecked
          }),
          React.createElement(
            'label',
            null,
            content
          ),
          React.createElement('button', { className: 'destroy', onClick: destroyItem })
        )
      );
    }
  }]);

  return TodoItem;
}(Component);

var CountDisplay = function (_Component4) {
  _inherits(CountDisplay, _Component4);

  function CountDisplay() {
    _classCallCheck(this, CountDisplay);

    return _possibleConstructorReturn(this, (CountDisplay.__proto__ || Object.getPrototypeOf(CountDisplay)).apply(this, arguments));
  }

  _createClass(CountDisplay, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'footer',
        { 'class': 'footer' },
        React.createElement('span', { 'class': 'todo-count' }),
        React.createElement(
          'button',
          { 'class': 'clear-completed', onClick: this.onClick },
          'Clear completed'
        )
      );
    }
  }]);

  return CountDisplay;
}(Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));