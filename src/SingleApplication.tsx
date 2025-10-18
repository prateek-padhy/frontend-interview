import React, { useMemo } from "react";
import styles from "./SingleApplication.module.css";
import { Application } from "./types";

type SingleApplicationProps = {
  application: Application;
};

const SingleApplication = ({ application }: SingleApplicationProps) => {
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 0,
      }),
    []
  );

  const dateFormatter = useMemo(
    () => ({
      format: (d: Date) => {
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      },
    }),
    []
  );

  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <a className={styles.email} href={`mailto:${application.email}`}>
          {application.email}
        </a>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {currencyFormatter.format(application.loan_amount)}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {dateFormatter.format(new Date(application.date_created))}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {dateFormatter.format(new Date(application.expiry_date))}
      </div>
    </div>
  );
};

export default SingleApplication;
