"use strict";
var userInfoForm = document.getElementById("user-info-form"),
  userName = document.getElementById("user-info-name"),
  userSurname = document.getElementById("user-info-surname"),
  userEmail = document.getElementById("user-info-email"),
  contentUsers = document.getElementById("content-users"),
  userInfo = document.getElementById("user-info"),
  userInfoTitle = document.getElementById("user-info-title"),
  userInfoButton = document.getElementById("user-info-button");
contentUsers.addEventListener("click", function (e) {
  e.target.classList.contains("button--edit")
    ? ((userInfoTitle.textContent = "Update User"),
      (userName.value = e.target.parentElement.children[0].textContent),
      (userSurname.value = e.target.parentElement.children[1].textContent),
      (userEmail.value = e.target.parentElement.children[2].textContent),
      (userInfoButton.textContent = "Update User"),
      (userInfoForm.action = "/update-user/".concat(
        e.target.parentElement.dataset.id
      )))
    : e.target.classList.contains("button--delete") &&
      fetch("/delete-user/".concat(e.target.parentElement.dataset.id), {
        method: "DELETE",
      })
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.ok && location.reload();
        });
}),
  userInfo.addEventListener("click", function (e) {
    e.target.classList.contains("button--cancel") &&
      ((userInfoTitle.textContent = "New User"),
      (userInfoButton.textContent = "Add User"),
      (userInfoForm.action = "/add-user"),
      (userName.value = ""),
      (userSurname.value = ""),
      (userEmail.value = ""));
  }),
  userInfoForm.addEventListener("submit", function (e) {
    e.preventDefault(),
      "" != userName.value.trim() &&
        "" != userSurname.value.trim() &&
        "" != userEmail.value.trim() &&
        e.target.submit();
  });
