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
const addSpaces = (value: string) => value.split("-").join(" - ");
const flexRating = (value: string) => {
  const rating = Number(value);
  if (rating < 3) return "Soft";
  if (rating >= 4 && rating <= 7) return "Medium";
  if (rating >= 8) return "Firm";
  return "";
}

const ProductDataCard: StorefrontFunctionComponent<ProductDataCardProps> = ({ }) => {
  const modal = useRef<HTMLDialogElement>(null);
  const [vs, setVs] = useState<DataPoints>({}); // Valid Specs.
  const [moreInfo, setMoreInfo] = useState<MoreInfoObject>({});

  useEffect(() => determineCategory(), []);

  useEffect(() => {
    if (!canUseDOM) return;
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  })

  const handleMessage = (e: MessageEvent) => {
    const eventData = e.data;
    const eventName = eventData.eventName;
    if (eventName === "vtex:productView") determineCategory();
  }

  const determineCategory = () => {
    const productCategoryDOM = grabDOM(`.${categoryClass}`);
    if (!productCategoryDOM) return;

    const productCategory = productCategoryDOM.innerText.toLowerCase();

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
    const dataAttributes: Array<string> = [];

    // Build [dataSpecs].
    for (const key in dataList) {
      const keyTypeFix: keyof DataPoints = key as keyof DataPoints;
      const dataPoint = dataList[keyTypeFix]!;
      const attribute = dataPoint.attribute!;
      dataAttributes.push(attribute);
    }

    for (let index = 0; index < dataAttributes.length; index++) {
      const attribute: string = dataAttributes[index];

      // Value is in the <td> that follows the specification.
      const val = grabDOM(`[data-specification="${attribute}"] + [data-specification]`) as HTMLElement;
      if (!val) continue;

      const tempKey = dataKeys[index] as keyof DataPoints;

      const tempObject: PointObject = {
        attribute,
        label: dataList[tempKey]?.label!,
        info: dataList[tempKey]?.info,
        value: val.innerText
      }

      tempValidSpecs[tempKey] = tempObject;
    }

    // Testing
    tempValidSpecs.bestUse = {
      label: "Best Use",
      value: "Powder",
      info: {},
      attribute: "ProductData_AllStyle_SB"
    }
    tempValidSpecs.baseTech = {
      label: "Base Tech",
      value: "Sintered",
      info: {
        text: "Beginners just started while Expert is just about to end."
      },
      attribute: "ProductData_WinBaseTech_SB"
    }
    tempValidSpecs.baseType = {
      label: "Base Type",
      value: "Die Cut",
      info: {
        text: "Beginners just started while Expert is just about to end."
      },
      attribute: "ProductData_WinBaseType_SB"
    }
    tempValidSpecs.core = {
      label: "Core",
      value: "Open Text Field",
      info: {
        text: "Beginners just started while Expert is just about to end."
      },
      attribute: "ProductData_WinCore_SB"
    }
    tempValidSpecs.flex = {
      label: "Flex",
      value: "4",
      info: {},
      attribute: "ProductData_WinFlex_SB"
    }
    tempValidSpecs.mounting = {
      label: "Mounting",
      value: "3 Hole",
      info: {},
      attribute: "ProductData_WinMounting_SB"
    }
    tempValidSpecs.profile = {
      label: "Profile",
      value: "Rocker",
      info: {},
      attribute: "ProductData_WinProfile_SB"
    }
    tempValidSpecs.riderLevel = {
      label: "Rider Level",
      value: "Intermediate-Advanced",
      info: {
        text: "Beginners just started while Expert is just about to end."
      },
      attribute: "ProductData_WinRiderLvl_SB"
    }
    tempValidSpecs.stance = {
      label: "Stance",
      value: "Setback 10-15mm",
      info: {},
      attribute: "ProductData_WinStance_SB"
    }
    tempValidSpecs.shape = {
      label: "Shape",
      value: "Directional",
      info: {},
      attribute: "ProductData_WinShape_SB"
    }
    tempValidSpecs.gender = {
      label: "Gender",
      value: "Womens",
      info: {
        text: "Gender is a social construct. Don't worry about it too much."
      },
      attribute: "ProductData_Gender_SB"
    }

    // Only setVs() if we have found product attributes.
    if (Object.keys(tempValidSpecs).length) setVs(tempValidSpecs);
  }

  const openModalClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const spec: keyof DataPoints = target.dataset.spec as keyof DataPoints;

    const title = vs[spec]?.label;
    const text = vs[spec]?.info?.text;
    const image = vs[spec]?.info?.image;
    setMoreInfo({ title, text, image });
    modal.current?.showModal();
  }

  const closeModalClick = () => {
    setMoreInfo({ title: "", text: "", image: "" });
    modal.current?.close();
  }

  const ValueElement = ({ spec, label }: { spec: keyof DataPoints, label: string }) => (
    <div className={styles.value}>
      {label === "Best Use" && // All Style
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {vs[spec]?.value}
          </div>
          <img src={`/arquivos/pdc-sb-${removeSpaces(vs[spec]?.value)}.png`} className={styles.valueImage} />
        </div>
      }
      {label === "Flex" &&
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {`${vs[spec]?.value} out of 10 - ${flexRating(vs[spec]?.value)}`}
          </div>
          <img src={`/arquivos/pdc-flex-${vs[spec]?.value}.png`} className={styles.valueImage} />
        </div>
      }
      {label === "Profile" &&
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {vs[spec]?.value}
          </div>
          <img src={`/arquivos/pdc-sb-profile-${vs[spec]?.value}.png`} className={styles.valueImage} />
        </div>
      }
      {label === "Rider Level" &&
        <div className={styles.valueStack}>
          <div className={styles.valueText}>
            {addSpaces(vs[spec]?.value)}
          </div>
          <img src={`/arquivos/pdc-${(vs[spec]?.value).toLowerCase()}.png`} className={styles.valueImage} />
        </div>
      }
      {/* String Only Outputs */
        (label === "Base Tech" ||
          label === "Base Type" ||
          label === "Core" ||
          label === "Mounting" ||
          label === "Stance" ||
          label === "Shape" ||
          label === "Gender") &&
        <div className={styles.valueText}>{vs[spec]?.value}</div>
      }
    </div>
  )

  return (<>{!!Object.keys(vs).length &&
    <section aria-labelledby="product-data-card-title" className={styles.container}>
      <h4 id="product-data-card-title" className="vtex-rich-text-0-x-heading t-heading-4 vtex-rich-text-0-x-headingLevel4">Details</h4>
      {Object.keys(vs).map((spec: string, index: number) => (
        <div key={`${spec}-${index}`} className={styles.detailsRow}>
          <div className={styles.spec}>{vs[spec as keyof DataPoints]?.label}:</div>
          <ValueElement spec={spec as keyof DataPoints} label={vs[spec as keyof DataPoints]?.label!} />
          <button onClick={openModalClick} data-spec={spec} aria-label={`Learn more about ${spec}`} className={styles.learnMore}>Learn More <span className={styles.questionMark}>?</span></button>
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
