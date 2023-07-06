import React from "react";
import { useParams } from "react-router-dom";
import { Id } from "../../types/types";

export default function UserPage() {
  const params = useParams<Id>();
  const param = params.id;
  console.log(params);

  return (
    <div className="page">
      <h1>User Page {param}</h1>
    </div>
  );
}
