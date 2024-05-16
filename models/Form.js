const mongoose = require('mongoose')
const FormDataSchema = new mongoose.Schema({
  plotSizes: [String],
  personalInformation: {
    name: String,
    s_dw_w: String,
    cnic: String,
    passport: String,
    currentMailingAddress: String,
    permanentMailingAddress: String,
    mobileNumber: String,
    officeNumber: String,
    email: String,
  },
  nomineeInformation: {
    nomineeName: String,
    nomineeS_dw_w: String,
    nomineeCnic: String,
    nomineePassport: String,
    relation: String,
    contactNumber: String,
  },
  modeOfPayment: {
    paymentMethods: [String],
    amount1: String,
    date1: String,
    amount2: String,
    date2: String,
  },
  signatures: {
    manager: String,
    officer: String,
    applicant: String,
  },
});

const FormDataModel = mongoose.model('FormData', FormDataSchema);

module.exports = FormDataModel;
