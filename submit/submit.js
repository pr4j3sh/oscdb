submitForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const values = Object.fromEntries(
    Array.from(e.target.elements)
      .filter((input) => input.name)
      .map((input) => [input.name, input.value]),
  );

  console.log(values);

  console.log("form submit");
}
