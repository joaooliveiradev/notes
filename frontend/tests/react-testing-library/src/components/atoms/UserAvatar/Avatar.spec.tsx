import { screen, render } from "@testing-library/react";
import { UserAvatar } from "./UserAvatar";

const renderSetup = () => {
  render(
    <UserAvatar
      name="avatarExample"
      imageSrc="https://www.w3schools.com/howto/img_avatar.png"
    />
  );
};

describe("<UserAvatar />", () => {
  it("should be rendering all the elements of the component", () => {
    renderSetup();
    const elementWrapper = screen.getByRole("listitem").parentElement;
    const listItemElement = screen.getByRole("listitem");
    const avatar = screen.getByRole("img");
    expect(elementWrapper).toBeInTheDocument();
    expect(listItemElement).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
  // The components avatar doesn't render an image in the test's, strange...
  // But if everything works that should, probabily i will made a test to have the alt attribute to increase the accessibility...
  // it("should have a alt attribute", () => {
  //   render(
  //     <UserAvatar
  //       name="avatarExample"
  //       imageSrc="https://avatars.githubusercontent.com/u/1395990?v=4"
  //     />
  //   );
  //   renderSetup()
  //   const avatar = screen.getByRole("img");
  //   expect(avatar).toHaveAttribute('alt')
  // });

});
