import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BlogForm from './BlogForm';

test('blogForm uses callback function with correct data', () => {
  const mockHandler = jest.fn();

  const component = render(
    <BlogForm createBlog={mockHandler} />
  );

  const author = component.container.querySelector('#author');
  const title = component.container.querySelector('#title');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(author, {
    target: { value: 'testaaja' }
  });
  fireEvent.change(title, {
    target: { value: 'testibloki' }
  });
  fireEvent.change(url, {
    target: { value: 'testing.local' }
  });

  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].author).toBe('testaaja');
  expect(mockHandler.mock.calls[0][0].title).toBe('testibloki');
  expect(mockHandler.mock.calls[0][0].url).toBe('testing.local');
});