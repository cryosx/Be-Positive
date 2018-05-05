BloodType = {
  AB_POS: 'AB_POS',
  AB_NEG: 'AB_NEG',
  A_POS: 'A_POS',
  A_NEG: 'A_NEG',
  B_POS: 'B_POS',
  B_NEG: 'B_NEG',
  O_POS: 'O_POS',
  O_NEG: 'O_NEG'
};

// Transfusion = {
//   AB_POS: [
//     BloodType.AB_POS,
//     BloodType.AB_NEG,
//     BloodType.A_POS,
//     BloodType.A_NEG,
//     BloodType.B_POS,
//     BloodType.B_NEG,
//     BloodType.O_POS,
//     BloodType.O_NEG
//   ],
//   AB_NEG: [BloodType.AB_NEG, BloodType.A_NEG, BloodType.B_NEG, BloodType.O_NEG],
//   A_POS: [BloodType.A_POS, BloodType.A_NEG, BloodType.O_POS, BloodType.O_NEG],
//   A_NEG: [BloodType.A_NEG, BloodType.O_NEG],
//   B_POS: [BloodType.B_POS, BloodType.B_NEG, BloodType.O_POS, BloodType.O_NEG],
//   B_NEG: [BloodType.B_NEG, BloodType.O_NEG],
//   O_POS: [BloodType.O_POS, BloodType.O_NEG],
//   O_NEG: [BloodType.O_NEG]
// };

Transfusion = {
  AB_POS: [
    BloodType.AB_POS,
    BloodType.A_POS,
    BloodType.B_POS,
    BloodType.O_POS
    // BloodType.O_NEG
  ],
  AB_NEG: [BloodType.AB_NEG, BloodType.A_NEG, BloodType.B_NEG, BloodType.O_NEG],
  A_POS: [BloodType.A_POS, BloodType.A_NEG, BloodType.O_POS],
  A_NEG: [BloodType.A_NEG, BloodType.O_NEG],
  B_POS: [BloodType.B_POS, BloodType.B_NEG, BloodType.O_POS],
  B_NEG: [BloodType.B_NEG, BloodType.O_NEG],
  O_POS: [BloodType.O_POS, BloodType.O_NEG],
  O_NEG: [BloodType.O_NEG]
};

BloodTransfusionRules = {
  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed: 200,

  /**
   * returns BloodType, or false to give no BloodType
   *
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   *
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   *
   */

  receive_patient: function(blood_inventory, patient) {
    if (
      patient.blood_type === BloodType.AB_POS &&
      blood_inventory[BloodType.AB_POS] > 0
    ) {
      return BloodType.AB_POS;
    }
    if (
      patient.blood_type === BloodType.A_POS &&
      blood_inventory[BloodType.A_POS] > 0
    ) {
      return BloodType.A_POS;
    }
    if (
      patient.blood_type === BloodType.B_POS &&
      blood_inventory[BloodType.B_POS] > 0
    ) {
      return BloodType.B_POS;
    }

    return getMostAvailable(blood_inventory, patient);

    function getMostAvailable(blood_inventory, patient) {
      let bloodTypes = Transfusion[patient.blood_type];
      let mostAvailableBloodType = bloodTypes[0];
      for (let i = 0; i < bloodTypes.length; i++) {
        if (
          blood_inventory[bloodTypes[i]] >
          blood_inventory[mostAvailableBloodType]
        ) {
          mostAvailableBloodType = bloodTypes[i];
        }
      }
      return mostAvailableBloodType;
    }
    function getRandom() {
      return [
        BloodType.AB_POS,
        BloodType.AB_NEG,
        BloodType.A_POS,
        BloodType.A_NEG,
        BloodType.B_POS,
        BloodType.B_NEG,
        BloodType.O_POS,
        BloodType.O_NEG
      ][Math.floor(Math.random() * 8)];
    }
  }
};
