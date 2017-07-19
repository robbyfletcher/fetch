function format(data, cb) {
  const d = data.map(e => ({
    key: e.animal_id,
    image: `http://petharbor.com/get_image.asp?RES=Detail&ID=${e.animal_id}&LOCATION=ASTN`,
    type: e.type,
    color: e.color,
    looksLike: e.looks_like,
    age: e.age,
    sex: e.sex,
    address: JSON.parse(e.location.human_address).address,
    city: JSON.parse(e.location.human_address).city,
    state: 'TX',
    at_aac: e.at_aac,
    intake_date: Date(e.intake_date),
  }));

  if (cb) {
    cb(d);
  }
}

export default format;
