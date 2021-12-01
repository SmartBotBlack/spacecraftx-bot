(async () => {
  while (1) {
    document.querySelectorAll("button").forEach((button) => {
      if (
        button.innerText === "MINE" &&
        getComputedStyle(button).opacity !== "0.6"
      ) {
        button.click();
      }
    });

    await new Promise((res) => setTimeout(res, 5 * 1000));
  }
})();
