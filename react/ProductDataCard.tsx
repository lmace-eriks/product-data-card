import React, { useEffect, useRef, useState, useMemo, ReactChildren } from "react";
import { Link, canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

// Types
import { ProductDataCardProps, DataPoints, PointObject, MoreInfoObject } from "./typesdata";

// Data
import { categories } from "./typesdata";

// Class of second tier breadcrumb. Inner Text contains "Bicycles", "Snowboards", ect.
const categoryClass = "vtex-breadcrumb-1-x-arrow--2";

const grabDOM: any = (selector: string) => canUseDOM ? document.querySelector(selector) : null;
const removeSpaces = (value: string) => value.split(" ").join("-").toLowerCase();
const removeHyphens = (value: string) => value.split("-").join(" ");

const ProductDataCard: StorefrontFunctionComponent<ProductDataCardProps> = ({ }) => {
  const modal = useRef<any>();
  const [vs, setVs] = useState<DataPoints>({}); // Valid Specs.
  const [moreInfo, setMoreInfo] = useState<MoreInfoObject>({});

  useEffect(() => {
    console.clear();
    determineCategory();
  }, []);

  const determineCategory = () => {
    const productCategory = grabDOM(`.${categoryClass}`).innerText.toLowerCase();

    for (const key in categories) {
      // Only searchForSpecs() if productCategory is in {categories}.
      if (productCategory === key) {
        searchForSpecs(categories[productCategory]);
        break;
      }
    }
  }

  const searchForSpecs = (dataList: DataPoints) => {
    const tempValidSpecs: DataPoints = new Object();
    const dataKeys: Array<string> = Object.keys(dataList);
    const dataSpecs: Array<string> = [];

    // Build [dataSpecs].
    for (const key in dataList) {
      const keyTypeFix: keyof DataPoints = key as keyof DataPoints;
      const dataPoint = dataList[keyTypeFix]!;
      const spec = dataPoint.spec!;
      dataSpecs.push(spec);
    }

    for (let index = 0; index < dataSpecs.length; index++) {
      const spec: string = dataSpecs[index];

      // Value is in the <td> that follows the specification.
      const val = grabDOM(`[data-specification="${spec}"] + [data-specification]`) as HTMLElement;
      if (!val) continue;

      const tempKey = dataKeys[index] as keyof DataPoints;

      const tempObject: PointObject = {
        spec,
        label: dataList[tempKey]?.label!,
        info: dataList[tempKey]?.info,
        value: val.innerText
      }

      tempValidSpecs[tempKey] = tempObject;
    }

    // Testing
    tempValidSpecs.bestUse = {
      label: "Best Use",
      value: "Park | Pipe",
      info: {},
      spec: "ProductData_AllStyle_SB"
    }
    tempValidSpecs.baseTech = {
      label: "Base Tech",
      value: "Sintered",
      info: {
        text: "Beginners just started while Expert is just about to end."
      },
      spec: "ProductData_WinBaseTech_SB"
    }
    tempValidSpecs.baseType = {
      label: "Base Type",
      value: "Die Cut",
      info: {
        text: "Beginners just started while Expert is just about to end."
      },
      spec: "ProductData_WinBaseType_SB"
    }
    tempValidSpecs.core = {
      label: "Core",
      value: "Open Text Field",
      info: {
        text: "Beginners just started while Expert is just about to end."
      },
      spec: "ProductData_WinCore_SB"
    }
    tempValidSpecs.flex = {
      label: "Flex",
      value: "8",
      info: {},
      spec: "ProductData_WinFlex_SB"
    }
    tempValidSpecs.mounting = {
      label: "Mounting",
      value: "3 Hole",
      info: {},
      spec: "ProductData_WinMounting_SB"
    }
    tempValidSpecs.profile = {
      label: "Profile",
      value: "Rocker",
      info: {},
      spec: "ProductData_WinProfile_SB"
    }
    tempValidSpecs.riderLevel = {
      label: "Rider Level",
      value: "Beginner-Intermediate",
      info: {
        text: "Beginners just started while Expert is just about to end."
      },
      spec: "ProductData_WinRiderLvl_SB"
    }
    tempValidSpecs.stance = {
      label: "Stance",
      value: "Setback 10-15mm",
      info: {},
      spec: "ProductData_WinStance_SB"
    }
    tempValidSpecs.shape = {
      label: "Shape",
      value: "Directional",
      info: {},
      spec: "ProductData_WinShape_SB"
    }

    // Only setVs() if we have found product specs.
    if (Object.keys(tempValidSpecs).length) setVs(tempValidSpecs);
  }

  const openModalClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const spec: keyof DataPoints = target.dataset.spec as keyof DataPoints;

    const title = vs[spec]?.label;
    const text = vs[spec]?.info?.text;
    const image = vs[spec]?.info?.image;
    setMoreInfo({ title, text, image });
    modal.current.showModal();
  }

  const closeModalClick = () => {
    setMoreInfo({ title: "", text: "", image: "" });
    modal.current.close();
  }

  const ValueElement = ({ spec }: { spec: keyof DataPoints }) => (
    <div className={styles.value}>
      {vs[spec]?.label === "Best Use" && // All Style
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {vs[spec]?.value}
          </div>
          <img src={`/arquivos/pdc-sb-${removeSpaces(vs[spec]?.value)}.png`} className={styles.valueImage} />
        </div>
      }
      {vs[spec]?.label === "Base Tech" &&
        <div className={styles.valueText}>{vs[spec]?.value}</div>
      }
      {vs[spec]?.label === "Base Type" &&
        <div className={styles.valueText}>{vs[spec]?.value}</div>
      }
      {vs[spec]?.label === "Core" &&
        <div className={styles.valueText}>{vs[spec]?.value}</div>
      }
      {vs[spec]?.label === "Flex" &&
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {vs[spec]?.value <= 3 && <>Soft</>}
            {vs[spec]?.value >= 4 && vs[spec]?.value <= 7 && <>Medium</>}
            {vs[spec]?.value > 7 && <>Firm</>}
          </div>
          <img src={`/arquivos/pdc-flex-${vs[spec]?.value}.png`} className={styles.valueImage} />
        </div>
      }
      {vs[spec]?.label === "Mounting" &&
        <div className={styles.valueText}>{vs[spec]?.value}</div>
      }
      {vs[spec]?.label === "Profile" &&
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {vs[spec]?.value}
          </div>
          <img src={`/arquivos/pdc-sb-profile-${vs[spec]?.value}.png`} className={styles.valueImage} />
        </div>
      }
      {vs[spec]?.label === "Rider Level" &&
        <div className={styles.valueStack}>
          <div className={styles.valueText}>
            {vs[spec]?.value === "beginner-intermediate" && <>Beginner - Intermediate</>}
            {vs[spec]?.value === "intermediate-advanced" && <>Intermediate - Advanced</>}
            {vs[spec]?.value === "advanced-expert" && <>Advanced - Expert</>}
          </div>
          <img src={`/arquivos/pdc-${(vs[spec]?.value).toLowerCase()}.png`} className={styles.valueImage} />
        </div>
      }
      {vs[spec]?.label === "Stance" &&
        <div className={styles.valueText}>{vs[spec]?.value}</div>
      }
    </div>
  )

  return (<>{Object.keys(vs).length &&
    <section aria-labelledby="product-data-card-title" className={styles.container}>
      <h4 id="product-data-card-title" className="vtex-rich-text-0-x-heading t-heading-4 vtex-rich-text-0-x-headingLevel4">Details</h4>
      <div>This is just test data. Don't freak out. - LM</div>
      {Object.keys(vs).map((spec: string, index: number) => (
        <div key={`${spec}-${index}`} className={styles.detailsRow}>
          <div className={styles.spec}>{vs[spec as keyof DataPoints]?.label}:</div>
          <ValueElement spec={spec as keyof DataPoints} />
          <button onClick={openModalClick} data-spec={spec} aria-label={`Learn more about ${spec}`} className={styles.learnMore}>Learn More</button>
        </div>
      ))}
      <dialog ref={modal} className={styles.dialog}>
        {moreInfo.title && <div className={styles.dialogTitle}>{moreInfo.title}</div>}
        {moreInfo.text && <div className={styles.dialogText}>{moreInfo.text}</div>}
        {moreInfo.image && <img src={moreInfo.image} className={styles.dialogImage} />}
        <button onClick={closeModalClick} className={styles.dialogButton}>Close</button>
      </dialog>
    </section>
  }</>);
};

ProductDataCard.schema = {
  title: "ProductDataCard",
  description: "",
  type: "object",
  properties: {

  }
};

export default ProductDataCard;
