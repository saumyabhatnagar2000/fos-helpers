require("dotenv").config;
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./vernac-cg-47c3aec92998.json");
const constants = require("./constants.json");
const fs = require("fs");

const generateExcel = async () => {
  const doc = new GoogleSpreadsheet(
    "1xd_lWLgrWacDOQ14P6uotZlDFf9ge1fNySyXSDmqrm8"
  );

  await doc.useServiceAccountAuth({
    client_email: "test-vernac@vernac-cg.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDByUbBHafYlGnN\n6/BCkkOIfrDkDAqbGo5aTaiWG/TN7Gc+h0t/PgBoYZYm5uMkDg9zbR9Nk63HFGL2\nVRNMI4CSXxP0ozSS+qdv5ZSfSTJYwDD6pCmWuczd2qLDOhwqiBsl1zSL5aNNO9hn\nxXP4gxRZVHKuRiRamUYKwbMYBlaSjaPqmg32vzl9JxM1nSy4Ic2sh/CIuC5moZUM\n1FFsoOU9lzD1GRxkPUVWLa8Qeu5IpX5MXdrJ8THJTMJd2b8glD6GgrBYYeLyHZOM\nlAciBqoehiiazeFbha3LizC/hfKDVWLOigiQ9fGroK2nxoX1WjsxsXdr+CEszlO3\n8RWrCb+RAgMBAAECggEASgD3A72zAQsgYrLFBG892gzjuZr9m+Dm1waMKJMRiGhM\nvzzEsJl5Z2NJB58pw/WYofBcwW/xr7KR3ld78JooOf2ULdr7s1uEgL9wY+n8j5cJ\nvVXeygA3g8vAV4TEB9wFXgyStRAjrlV53ZsyoAdSyJBu4S3JKU4aSPZS0gxtmDZT\n5q0nSKHTSaeR6CeaUZccA4BZdD3xxXhJaY3x1FdhE+05uk0BBbUjYlkJEYexi7Sn\n8KTwZ2ArDE2c6Ogm45MkQYwUu4QoUhJaGYd1Wasmso/Bn4nEZAiVqgd9UEOg7RTK\nwXN9eOzPO5L7V44xrumYEg0BswX5xIXbQUEYPsChnwKBgQDj6AGI0TUmh3RRKZ9y\nk3bcpbJVtMx1lpb7RKvvt+ujKHnP/dcd+DNGjiFwDAxwJfQUW17dH2b50B5Mky9c\nDSSGVbbeQR36gfalUV4mzERMBBKWmhm11AFtWUHCDr5Sy0fdGXn9S9WldsvZ/Mo9\nelidteEHCYhXQQb2Ck8fGjVY5wKBgQDZrI0N2If2b+XAtv14v7XyUxnxioU0Q6lW\nNQ9ANXxge/twLkvbLTztqJ2fg8BTuRl+toETElxo9Dqn3cWx2v0eSsN1/s84Vm4c\nVq3dqfuVXfjNkR1ICKehhrzXAC+nR+2cOn6CmsYReq0ZZur73wZ5WBBfCUf3G0UD\nVjl0vni8xwKBgFXYmGte0nR25VuFIChaX5VxXKFn/vP0C18OWO1tC/djUa8E4LjL\nOxVCiFnaT/0WbsAUQsFsCK/ksuUJM/eqg62OL9m8EXzA45UV9y8KFlfD2PSdiz2w\nY/E6g8iDITGynJkt9YNxw0IWY2bzD4LkyOhvEBpEfvTO675V18PRbXLVAoGABHQ4\naqkclxlRDTFxXFAn6+5xYHTiJuCfjWkGh9zQT7UZvwDjgneZgI9rskDi5ZOrBuG7\nIGXGyEr/DEJIckw107HZ8AcnvFJgbGoForyArly+443tmHS84Vw9bvTNBNI+9Wxo\n/EkodmEZO6TUeBTnMAJyS0+ITnEbZ2cTQ+VF2S8CgYEAlxxQp9FMW/D/3z3dSh4B\n1JWUPVVMk0gH2EeEDy+pVQjGVqjeDkBCYLjdDpXIIs4GjpowteXTBeMbDv2WsUZJ\naVXdMWSq1fiGL06/zQiHTwCa+6nA2spU50vdPRRX6pvcd5aptdvPkTteE6bHFHnf\ncadWvtBWBruKD58d9/ZGBKA=\n-----END PRIVATE KEY-----\n",
  });

  const sheet = await doc.addSheet({
    title: "Vernac",
    headerValues: ["vernac_id", "english", "translation"],
  });

  let rowArray = [];

  Object.keys(constants).forEach(async (constantKey) => {
    const vernac_id = constants[constantKey].vernac_id;
    const string_value = constants[constantKey].string_value;
    rowArray.push({ vernac_id, english: string_value });
  });

  await sheet.addRows(rowArray);
};

const generateTranslate = async () => {
  const doc = new GoogleSpreadsheet(
    "1xd_lWLgrWacDOQ14P6uotZlDFf9ge1fNySyXSDmqrm8"
  );
  await doc.useServiceAccountAuth({
    client_email: "test-vernac@vernac-cg.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDByUbBHafYlGnN\n6/BCkkOIfrDkDAqbGo5aTaiWG/TN7Gc+h0t/PgBoYZYm5uMkDg9zbR9Nk63HFGL2\nVRNMI4CSXxP0ozSS+qdv5ZSfSTJYwDD6pCmWuczd2qLDOhwqiBsl1zSL5aNNO9hn\nxXP4gxRZVHKuRiRamUYKwbMYBlaSjaPqmg32vzl9JxM1nSy4Ic2sh/CIuC5moZUM\n1FFsoOU9lzD1GRxkPUVWLa8Qeu5IpX5MXdrJ8THJTMJd2b8glD6GgrBYYeLyHZOM\nlAciBqoehiiazeFbha3LizC/hfKDVWLOigiQ9fGroK2nxoX1WjsxsXdr+CEszlO3\n8RWrCb+RAgMBAAECggEASgD3A72zAQsgYrLFBG892gzjuZr9m+Dm1waMKJMRiGhM\nvzzEsJl5Z2NJB58pw/WYofBcwW/xr7KR3ld78JooOf2ULdr7s1uEgL9wY+n8j5cJ\nvVXeygA3g8vAV4TEB9wFXgyStRAjrlV53ZsyoAdSyJBu4S3JKU4aSPZS0gxtmDZT\n5q0nSKHTSaeR6CeaUZccA4BZdD3xxXhJaY3x1FdhE+05uk0BBbUjYlkJEYexi7Sn\n8KTwZ2ArDE2c6Ogm45MkQYwUu4QoUhJaGYd1Wasmso/Bn4nEZAiVqgd9UEOg7RTK\nwXN9eOzPO5L7V44xrumYEg0BswX5xIXbQUEYPsChnwKBgQDj6AGI0TUmh3RRKZ9y\nk3bcpbJVtMx1lpb7RKvvt+ujKHnP/dcd+DNGjiFwDAxwJfQUW17dH2b50B5Mky9c\nDSSGVbbeQR36gfalUV4mzERMBBKWmhm11AFtWUHCDr5Sy0fdGXn9S9WldsvZ/Mo9\nelidteEHCYhXQQb2Ck8fGjVY5wKBgQDZrI0N2If2b+XAtv14v7XyUxnxioU0Q6lW\nNQ9ANXxge/twLkvbLTztqJ2fg8BTuRl+toETElxo9Dqn3cWx2v0eSsN1/s84Vm4c\nVq3dqfuVXfjNkR1ICKehhrzXAC+nR+2cOn6CmsYReq0ZZur73wZ5WBBfCUf3G0UD\nVjl0vni8xwKBgFXYmGte0nR25VuFIChaX5VxXKFn/vP0C18OWO1tC/djUa8E4LjL\nOxVCiFnaT/0WbsAUQsFsCK/ksuUJM/eqg62OL9m8EXzA45UV9y8KFlfD2PSdiz2w\nY/E6g8iDITGynJkt9YNxw0IWY2bzD4LkyOhvEBpEfvTO675V18PRbXLVAoGABHQ4\naqkclxlRDTFxXFAn6+5xYHTiJuCfjWkGh9zQT7UZvwDjgneZgI9rskDi5ZOrBuG7\nIGXGyEr/DEJIckw107HZ8AcnvFJgbGoForyArly+443tmHS84Vw9bvTNBNI+9Wxo\n/EkodmEZO6TUeBTnMAJyS0+ITnEbZ2cTQ+VF2S8CgYEAlxxQp9FMW/D/3z3dSh4B\n1JWUPVVMk0gH2EeEDy+pVQjGVqjeDkBCYLjdDpXIIs4GjpowteXTBeMbDv2WsUZJ\naVXdMWSq1fiGL06/zQiHTwCa+6nA2spU50vdPRRX6pvcd5aptdvPkTteE6bHFHnf\ncadWvtBWBruKD58d9/ZGBKA=\n-----END PRIVATE KEY-----\n",
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];
  const rows = await sheet.getRows();
  // console.log(rows);
  let inJSON = {};
  rows.forEach((row) => {
    inJSON = { [row.vernac_id]: row["Hindi"], ...inJSON };
  });
  console.log(inJSON);
  fs.writeFileSync("hi.json", JSON.stringify(inJSON), "utf-8");
  console.log("Successfully created hi.json");
};

generateTranslate();
