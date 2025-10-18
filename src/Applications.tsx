import React from "react";

import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";
import { useApplications } from "./api/useApplications";

const Applications = () => {
  const {
    data: applicationsData,
    isLoading: isApplicationsLoading,
    isError: isApplicationError,
    error: applicationError,
    fetchNextPage: fetchMoreApplications,
    isFetchingNextPage: isFetchingMoreApplications,
  } = useApplications();

  const applications =
    applicationsData?.pages.flatMap((page) => page.items) || [];

  if (isApplicationsLoading) {
    return <div className={styles.Applications}>Loading applications...</div>;
  }

  if (isApplicationError) {
    return (
      <div className={styles.Applications}>
        Error loading applications: {applicationError.message}
      </div>
    );
  }

  return (
    <div className={styles.Applications}>
      {applications.map((application) => (
        <SingleApplication key={application.id} application={application} />
      ))}

      <Button
        className={styles.Button}
        disabled={isFetchingMoreApplications}
        onClick={() => fetchMoreApplications()}
      >
        Load More
      </Button>
    </div>
  );
};

export default Applications;
