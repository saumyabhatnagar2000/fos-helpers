const str = "{loanIds} are closed,{why}";

const translate = (str, dynamic) => {
  //   console.log(dynamic);
  if (dynamic) {
    for (const key in dynamic) {
      if (str.includes(key)) {
        const inx = str.indexOf(key);
        str = str.replaceAll(`{${key}}`, dynamic[key]);
      }
    }
    return str;
  }
  return str;
};

console.log(translate(str, { loanIds: "id1,id2,id3", why: "sasas" }));
