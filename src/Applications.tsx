import React from "react";

import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";
import { useApplications } from "./api/useApplications";

const Applications = () => {
  const {
    data: applications,
    isLoading: isApplicationsLoading,
    isError: isApplicationError,
    error: applicationError,
  } = useApplications();

  if (isApplicationsLoading) {
    return <div>Loading applications...</div>;
  }

  if (isApplicationError) {
    return <div>Error loading applications: {applicationError.message}</div>;
  }

  return (
    <div className={styles.Applications}>
      <SingleApplication application={applications[0]} />

      <Button className={styles.Button}>Load More</Button>
    </div>
  );
};

export default Applications;
