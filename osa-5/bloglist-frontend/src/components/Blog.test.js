import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blogs = [{
    title: "Testiblogi",
    author: "Testitiimi",
    url: "https://invalidurl.test/",
    user: {
        username: "tester",
        name: "Tester"
    }
}];

test("Only title and author are shown by default", () => {
    const component = render(
        <Blog blog={blogs[0]} user={blogs[0].user} handleLike={() => {}} handleRemove={() => {}} />
    );

    expect(component.container).toHaveTextContent(
        "Testiblogi, Testitiimi"
    );

    expect(component.container.getElementsByClassName("Information")[0].style.display).toEqual("None");
});

test("likes and url are shown after 'view' is clicked", () => {
    const component = render(
        <Blog blog={blogs[0]} user={blogs[0].user} handleLike={() => {}} handleRemove={() => {}} />
    );

    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container.getElementsByClassName("Information")[0].style.display).not.toEqual("None");
});

test("function for like is called two times when like is clicked two times", () => {
    const mockHandler = jest.fn();
    
    const component = render(
        <Blog blog={blogs[0]} user={blogs[0].user} handleLike={mockHandler} handleRemove={() => {}} />
    );

    const button = component.getByText("like");
    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe(1);

    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe(2);
});