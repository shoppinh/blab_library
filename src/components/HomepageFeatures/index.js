import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Dễ sử dụng",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Thư viện blab được thiết kế từ mặt đất để dễ dàng cài đặt và Được sử
        dụng để có được các ứng dụng lên và chạy nhanh chóng.
      </>
    ),
  },
  {
    title: "Tập trung vào những gì quan trọng",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Thư viện blab cho phép bạn tập trung vào phát triển hợp đồng thông minh
        ETH và chúng tôi sẽ Làm các công việc.Hãy tiếp tục và xây dựng hợp đồng
        thông minh của bạn.
      </>
    ),
  },
  {
    title: "Được cung cấp bởi web3js",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Thư viện Blab sử dụng web3js để tương tác với blockchain Ethereum.Bạn Có
        thể sử dụng nó để tương tác với các hợp đồng thông minh và nhiều hơn
        nữa.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
