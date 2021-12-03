(async () => {
  while (1) {
    // Find button mine
    const buttonMine = [...document.querySelectorAll("button")].find(
      (button) =>
        button.innerText === "MINE" &&
        getComputedStyle(button).opacity !== "0.6"
    );

    //  Click Button mine
    buttonMine.click();

    await new Promise((res) => setTimeout(res, 10 * 1000));

    /**
     * Restore Energy
     */
    // Get current energy
    const [energyCurrent, energyMax] = [...document.querySelectorAll("div")]
      .find((div) =>
        [...div.classList].find((className) =>
          className.includes("AssetView_assetStatusBar")
        )
      )
      .innerText.split("/");

    // If current energy less than 10%
    if (energyCurrent / energyMax < 0.1) {
      const buttonRepair = [...document.querySelectorAll("button")].find(
        (button) =>
          button.innerText === "REPAIR" &&
          [...button.classList].some((className) =>
            className.includes("Button_default_alternative_button")
          )
      );

      await new Promise((res) => setTimeout(res, 10 * 1000));

      // Repair
      buttonRepair.click();

      await new Promise((res) => setTimeout(res, 10 * 1000));

      const buttonConfirmRepair = [...document.querySelectorAll("button")].find(
        (button) =>
          button.innerText === "REPAIR" &&
          [...button.classList].some((className) =>
            className.includes("Button_default_button")
          )
      );

      // Confirm rapir
      buttonConfirmRepair.click();
    }

    await new Promise((res) => setTimeout(res, 10 * 1000));
  }
})();
