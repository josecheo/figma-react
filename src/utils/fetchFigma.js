export const fetchFigma = async (fileID) => {
  // let resultData = null;
  var myHeaders = new Headers();
  myHeaders.append(
    "X-Figma-Token",
    "figd_AnOp6zv6cDBlImEnFkT-AYrWIo78jihkZUwAz_VH"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(
    `https://api.figma.com/v1/files/${fileID}`,
    requestOptions
  );
  if (response) {
    return response.json();
  }
  //   .then((response) => response.json())
  //   .then((result) => result)
  //   .catch((error) => console.log("error", error));
};
