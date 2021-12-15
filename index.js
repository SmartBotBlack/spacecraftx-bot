(async () => {
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  while (1) {
    // Find items
    const items = [...document.querySelectorAll("div")].filter((div) =>
      [...div.classList].some((className) =>
        className.includes("MarketPage_marketToolIconWrapper")
      )
    );

    for (const item of items) {
      item.click();

      await new Promise((res) => setTimeout(res, randomInt(5, 15) * 1000));

      /**
       * Coins
       */
      const coinCounter = [...document.querySelectorAll("div")].find((div) =>
        [...div.classList].some((className) =>
          className.includes("Header_headerLine")
        )
      );
      const [SCIC, SCID, SCIW] = [...coinCounter.children].map(
        (child) => +child.textContent
      );

      /**
       * Restore energy
       */
      try {
        const energyBtn = [...document.querySelectorAll("div")].find((div) =>
          [...div.classList].some((className) =>
            className.includes("BuyEnergy_buyEnergyText")
          )
        );
        const [energyCurrent, energyMax] = energyBtn.innerText
          .split("/")
          .map(Number);

        if (energyCurrent < energyMax - 100 && SCIW > 10) {
          energyBtn.click();
          await new Promise((res) => setTimeout(res, randomInt(5, 15) * 1000));

          // Find plus button
          const plusEnergyBtn = [...document.querySelectorAll("div")].find(
            (div) =>
              [...div.classList].some((className) =>
                className.includes("BuyEnergyPopup_buyPlusButton")
              )
          );

          for (let i = 0; i < Math.min(SCIW, 10); ++i) {
            plusEnergyBtn.click();
            await new Promise((res) => setTimeout(res, randomInt(1, 2) * 1000));
          }

          // Find Exchange button
          const exchangeEnergyBtn = [...document.querySelectorAll("div")]
            .find(
              (div) =>
                [...div.classList].some((className) =>
                  className.includes("PopupExchangeLayout_popupFooter")
                ) && div.innerText === "EXCHANGE"
            )
            .querySelector("button");

          exchangeEnergyBtn.click();

          await new Promise((res) => setTimeout(res, randomInt(5, 15) * 1000));
        }
      } catch (e) {
        console.error("Restore energy error", e);
      }

      try {
        // Find button mine
        const buttonMine = [...document.querySelectorAll("button")].find(
          (button) =>
            button.innerText === "MINE" &&
            getComputedStyle(button).opacity !== "0.6"
        );

        //  Click Button mine
        if (buttonMine) {
          buttonMine.click();

          await new Promise((res) => setTimeout(res, randomInt(5, 15) * 1000));
        }
      } catch (e) {
        console.error("Mine error", e);
      }

      /**
       * Repair
       */
      try {
        // Get current compensation
        const [energyCurrent, energyMax] = [...document.querySelectorAll("div")]
          .find((div) =>
            [...div.classList].find((className) =>
              className.includes("AssetView_assetStatusBar")
            )
          )
          .innerText.split("/");

        // If current compensation less than 10%
        if (energyCurrent / energyMax < 0.1) {
          const buttonRepair = [...document.querySelectorAll("button")].find(
            (button) =>
              button.innerText === "REPAIR" &&
              [...button.classList].some((className) =>
                className.includes("Button_default_alternative_button")
              )
          );

          // Repair
          buttonRepair.click();

          await new Promise((res) => setTimeout(res, randomInt(5, 15) * 1000));

          const buttonConfirmRepair = [
            ...document.querySelectorAll("button"),
          ].find(
            (button) =>
              button.innerText === "REPAIR" &&
              [...button.classList].some((className) =>
                className.includes("Button_default_button")
              )
          );

          // Confirm rapir
          buttonConfirmRepair.click();

          await new Promise((res) => setTimeout(res, randomInt(5, 15) * 1000));
        }
      } catch (e) {
        console.error("Repair Error", e);
      }

      await new Promise((res) => setTimeout(res, randomInt(5, 15) * 1000));
    }
  }
})();
