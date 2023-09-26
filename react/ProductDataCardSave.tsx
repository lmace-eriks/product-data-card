import React, { useEffect, useRef, useState, useMemo, ReactChildren } from "react";
import { Link, canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

interface ProductDataCardProps {
  blockClass: string
}

interface DataPoints {
  allStyle?: string
  baseTech?: string
  baseType?: string
  bestUse?: string
  material?: string
  wheelSize?: string
  cassetteGears?: string
  chainrings?: string
  handlebar?: string
  core?: string
  flex?: string
  mounting?: string
  profile?: string
  riderLevel?: string
  stance?: string
  shape?: string
  gender?: string
  bindings?: string
  geo?: string
  tailType?: string
  turnRadius?: string
  waistWidth?: string
}

const snowboardDataPoints: DataPoints = {
  allStyle: "Test_ProductData_AllStyle_SB", //"ProductData_AllStyle_SB",
  baseTech: "Test_ProductData_WinBaseTech_SB", //"ProductData_WinBaseTech_SB",
  baseType: "ProductData_WinBaseType_SB",
  core: "Test_ProductData_WinCore_SB", //"ProductData_WinCore_SB",
  flex: "ProductData_WinFlex_SB",
  mounting: "ProductData_WinMounting_SB",
  profile: "ProductData_WinProfile_SB",
  riderLevel: "ProductData_WinRiderLvl_SB",
  stance: "ProductData_WinStance_SB",
  shape: "ProductData_WinShape_SB",
  gender: "ProductData_Gender_SB"
}

const skiDataPoints: DataPoints = {
  allStyle: "ProductData_AllStyle_SK",
  bindings: "ProductData_WinBindings_SK",
  core: "ProductData_WinCore_SK",
  flex: "ProductData_WinFlex_SK",
  geo: "ProductData_WinGeo_SK",
  profile: "ProductData_WinProfile_SK",
  riderLevel: "ProductData_WinRiderLvl_SK",
  tailType: "ProductData_WinTailType_SK",
  turnRadius: "ProductData_WinTurnRadius_SK",
  waistWidth: "ProductData_WinWaistWidth_SK",
  gender: "ProductData_Gender_SK"
}

const bikeDataPoints: DataPoints = {
  bestUse: "ProductData_BikeBestUse",
  material: "ProductData_BikeMaterial",
  wheelSize: "ProductData_BikeWhlSize",
  cassetteGears: "ProductData_BikeCasGears",
  chainrings: "ProductData_BikeChainrings",
  handlebar: "ProductData_BikeHandlebar"
}

const categories: any = {
  snowboards: snowboardDataPoints,
  skis: skiDataPoints,
  bicycles: bikeDataPoints
}

// Class of second tier breadcrumb. Inner Text contains "Bicycles", "Snowboards", ect.
const categoryClass = "vtex-breadcrumb-1-x-arrow--2";

const grabDOM: any = (selector: string) => canUseDOM ? document.querySelector(selector) : null;

const ProductDataCard: StorefrontFunctionComponent<ProductDataCardProps> = ({ }) => {
  const [vs, setVs] = useState<DataPoints>(); // Valid Specs. - LM

  useEffect(() => {
    determineCategory();
  });

  const determineCategory = () => {
    const productCategory = grabDOM(`.${categoryClass}`).innerText.toLowerCase();

    for (const key in categories) {
      // Only searchForSpecs() if productCategory is in {categories}. - LM
      if (productCategory === key) {
        searchForSpecs(categories[productCategory]);
        break;
      }
    }
  }

  const searchForSpecs = (dataList: Array<DataPoints>) => {
    const tempValidSpecs: DataPoints = new Object();
    const dataKeys: Array<string> = Object.keys(dataList);
    const dataSpecs: Array<string> = Object.values(dataList as Array<string>);

    for (let index = 0; index < dataSpecs.length; index++) {
      const spec: string = dataSpecs[index];

      // Value is in the <td> that follows the specification. - LM
      const val = grabDOM(`[data-specification="${spec}"] + [data-specification]`) as HTMLElement;
      if (!val) continue;

      const tempKey = dataKeys[index] as keyof DataPoints;
      tempValidSpecs[tempKey] = val.innerText;
    }

    // Only setVs() if we have found product specs. - LM
    tempValidSpecs.riderLevel = "Beginner-Intermediate" // Testing
    if (Object.keys(tempValidSpecs).length) setVs(tempValidSpecs);
  }

  return (
    <section aria-labelledby="product-data-card-title" className={styles.container}>
      {vs &&
        <>
          <h4 id="product-data-card-title" className="vtex-rich-text-0-x-heading t-heading-4 vtex-rich-text-0-x-headingLevel4">Details</h4>
          {Object.keys(vs).map((spec: string, index: number) => (
            <div key={`${spec}-${index}`} className={styles.detailsRow}>
              <div className={styles.spec}>{spec}</div>
              <div className={styles.value}>{vs[spec as keyof DataPoints]}</div>
              <Link href="#" aria-label={`Learn more about ${spec}`} className={styles.link}>Learn More</Link>
            </div>
          ))}

          {/* {vs.allStyle &&
            <div className={styles.detailsRow}>
              <div className={styles.spec}>All Style: </div>
              <div className={styles.value}>{vs.allStyle}</div>
              <Link href="#" aria-label={`Learn more about ${vs.allStyle}`} className={styles.link}>Learn More</Link>
            </div>
          }
          {vs.baseTech &&
            <div className={styles.detailsRow}>
              <div className={styles.spec}>Base Tech: </div>
              <div className={styles.value}>{vs.baseTech}</div>
              <Link href="#" aria-label={`Learn more about ${vs.baseTech}`} className={styles.link}>Learn More</Link>
            </div>
          }
          {vs.core &&
            <div className={styles.detailsRow}>
              <div className={styles.spec}>Core: </div>
              <div className={styles.value}>{vs.core}</div>
              <Link href="#" aria-label={`Learn more about ${vs.core}`} className={styles.link}>Learn More</Link>
            </div>
          }
          {vs.core &&
            <div className={styles.detailsRow}>
              <div className={styles.spec}>Core: </div>
              <div className={styles.value}>{vs.core}</div>
              <Link href="#" aria-label={`Learn more about ${vs.core}`} className={styles.link}>Learn More</Link>
            </div>
          } */}
        </>
      }
    </section>
  );
};

ProductDataCard.schema = {
  title: "ProductDataCard",
  description: "",
  type: "object",
  properties: {

  }
};

export default ProductDataCard;
