export const DEVICE_LIST = "https://l253jictml.execute-api.ap-southeast-2.amazonaws.com/default/getMyDevices";
export const LINK_DEVICE = "https://f61ba4viy5.execute-api.ap-southeast-2.amazonaws.com/default/LinkDevice";
export const ELASTIC_QUERY = "https://lc1ttmmpkl.execute-api.ap-southeast-2.amazonaws.com/default/esUserQuery";
export const ELASTIC_CLUSTER_QUERY = "https://lc1ttmmpkl.execute-api.ap-southeast-2.amazonaws.com/default/esClusterQuery";

export const USER_DATA = "https://ja82bo4e2j.execute-api.ap-southeast-2.amazonaws.com/default/getUserData";
export const UPLOAD_AVATAR = "https://6ziwgkw5mi.execute-api.ap-southeast-2.amazonaws.com/default/uploadAvatar";
export const UNLINK_DEVICE = "https://386om5i73i.execute-api.ap-southeast-2.amazonaws.com/default/unlinkDevice";
export const STATUS_DEVICE_REQUEST = "https://08miwb2z3h.execute-api.ap-southeast-2.amazonaws.com/default/status_device_request";
export const CONTROL_DEVICE = "https://1kkpmpppf9.execute-api.ap-southeast-2.amazonaws.com/default/publish_to_mqttbroker";

export const WATER = "water";
export const TEMP = "temp";
export const PH = "ph";
export const HUMIDITY = "humidity";
export const LDR = "ldr";
export const RESOURCES = "resources";

export const TYPES = { 
    WATER: WATER,
    TEMP: TEMP,
    PH: PH,
    HUMIDITY: HUMIDITY,
    LDR: LDR
}

export const UNITS = { 
    "ph": "pH",
    "temp": "°C",
    "humidity": "%",
    "ldr": "ppm"
}