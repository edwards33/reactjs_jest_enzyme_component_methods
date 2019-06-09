import React from 'react';
import ReactDOM from 'react-dom';
import App, { Link, LinkOpt } from './App';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const TITLE = 'Title'

configure({
  adapter: new Adapter()
});


describe('<App /> mount rendering', () => {
  it('h1 contains correct text', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('h1').text()).toBe(TITLE)
    wrapper.unmount()
  })
});

describe('<App /> shallow rendering', () => {
  it('updates className with new State', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.blue').length).toBe(1)
    expect(wrapper.find('.red').length).toBe(0)
    wrapper.setState({ mainColor: 'red' })
    expect(wrapper.find('.blue').length).toBe(0)
    expect(wrapper.find('.red').length).toBe(1)
  })
  it('onButton click changes p text', () => {
    const wrapper = shallow(<App />)
    const button = wrapper.find('button')
    expect(wrapper.find('.button-state').text()).toBe('NO')
    button.simulate('click')
    expect(wrapper.find('.button-state').text()).toBe('YES')
  })
  it('on input change, title changes text', () => {
    const wrapper = shallow(<App />)
    const input = wrapper.find('input')
    expect(wrapper.find('h3').text()).toBe('')
    input.simulate('change', {currentTarget: {value: 'Some Text Typed'}})
    expect(wrapper.find('h3').text()).toBe('Some Text Typed')
  })
  it('calls componentDidMount and updates p tag text', () => {
    jest.spyOn(App.prototype, 'componentDidMount')
    const wrapper = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount')
  })
  it('setProps calls componentWillReceiveProps', () => {
    jest.spyOn(App.prototype, 'componentWillReceiveProps')
    const wrapper = shallow(<App />)
    wrapper.setProps({ hide: true })
    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps')
  })
  it('handleStrings function returns correctly', () => {
    const wrapper = shallow(<App />)
    const trueReturn = wrapper.instance().handleStrings('Some text ...')
    const falseReturn = wrapper.instance().handleStrings('')
    expect(trueReturn).toBe(true)
    expect(falseReturn).toBe(false)
  })
});
