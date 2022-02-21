import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

afterEach(() => {
  cleanup();
});
describe('Blog component renders only title and author by default', () => {
  test('Blog title renders', () => {
    const blogToTest = {
      title: 'test',
      author: 'tester',
      url: 'test.local'
    };

    const component = render(
      <Blog blog={blogToTest}/>
    );
    const div = component.container.querySelector('.titleAndAuthor');
    expect(div).toHaveTextContent(blogToTest.title);
    expect(div).toHaveTextContent(blogToTest.author);
  });
  test('Blog author renders', () => {
    const blogToTest = {
      title: 'test',
      author: 'tester',
      url: 'test.local'
    };

    const component = render(
      <Blog blog={blogToTest}/>
    );
    const div = component.container.querySelector('.titleAndAuthor');
    expect(div).toHaveTextContent(blogToTest.author);
  });
  test('URL and likes shown when button clicked', () => {
    const blogToTest = {
      title: 'test',
      author: 'tester',
      url: 'test.local',
      likes: 0
    };

    const mockHandler = jest.fn();

    const component = render(
      <Blog blog={blogToTest} handleLikes={mockHandler}/>
    );

    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blogToTest.likes);
    expect(component.container).toHaveTextContent(blogToTest.url);
  });

});

test('When like is pressed twice, event handler is called twice', () => {
  const blogToTest = {
    title: 'test',
    author: 'tester',
    url: 'test.local',
    likes: 0
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blogToTest} handleLikes={mockHandler}/>
  );

  const openButton = component.getByText('view');
  fireEvent.click(openButton);
  const likeButton = component.getByText('like');
  // thank you brains :--) fireEvent.click(openButton)
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

