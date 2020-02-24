import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("the form returns a new blog with given values", () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);
    const form = component.container.querySelector("form");
    const titleInput = component.container.getElementsByClassName("titleInput")[0].querySelector("input");
    const authorInput = component.container.getElementsByClassName("authorInput")[0].querySelector("input");
    const urlInput = component.container.getElementsByClassName("urlInput")[0].querySelector("input");

    fireEvent.change(titleInput, {
        target: { value: "Testiblogi testaamista varten" }
    });
    fireEvent.change(authorInput, {
        target: { value: "Tester" }
    });
    fireEvent.change(urlInput, {
        target: { value: "https://invalidurl.test" }
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls.length).toBe(1);
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: "Testiblogi testaamista varten",
        author: "Tester",
        url: "https://invalidurl.test"
    });
});