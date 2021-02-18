// import React from 'react';
// import $ from 'jquery';
//
// import {Paper} from './appstyle';
// // import BasicForm from "./components/BasicCalculation";
//
//
// export default function App () {
//   ;(function ($, window, document) {
//
//
//     // CALCULATE AMORTIZATION SCHEDULE
//     // This method outputs a table with the repayment schedule
//
//     // CALCULATE COMPARE
//     // The comparison mode gets 4 values from the form and calculates, then
//
//     // CALCULATE BASIC
//     // for the basic calculation, we're just getting the values and
//
//     // GET FIELD
//     // A function just for grabbing the value from a particular field.
//     // We need this because if the field doesn't exist, the plugin will
//     // create it for them.
//     const get_field = function (elem, options, name) {
//
//       // Check for an input with a className of the name.
//       let field;
//       if (elem.find(".accrue-" + name).length) { // if has a className of accrue-[name]
//         field = elem.find(".accrue-" + name);
//       } else if (elem.find("." + name).length) { // if we have className of just the name
//         field = elem.find("." + name);
//       } else if (elem.find("input[name~=" + name + "]").length) {
//         elem.find("input[name~=" + name + "]");
//       } else {
//         field = "";
//       }
//
//       // If we have the field value, return it right away so that the
//       // calculator doesn't write the field to the form div since we
//       // don't need it to.
//       if (typeof (field) !== "string") {
//         return field.val();
//       }
//
//       if (name === "term_compare") {
//         return false;
//       }
//
//       // If we've gotten here, no fields were found that match the
//       // criteria. Create the form field and return the default value.
//       elem.find(".form").append(
//           '<div className="accrue-field-' + name + '">' +
//           '<p><label>' + options.field_titles[name] + ':</label>' +
//           '<input type="text" className="' + name + '" value="' + options.default_values[name] + '" />' +
//           (options.field_comments[name].length > 0 ? "<small>" + options.field_comments[name] + "</small>" : '') + '</p>' +
//           '</div>');
//       return elem.find("." + name).val();
//
//     };
// // calculating loan info for a single loan.
//     const calculateBasic = function (elem, options, output_elem) {
//
//       // get the loan information from the current values in the form.
//       const loan_info = $.loanInfo({
//         amount: get_field(elem, options, "amount"),
//         rate: get_field(elem, options, "rate"),
//         term: get_field(elem, options, "term")
//       });
//
//       // if valid, output into the output_elem that was passed into this function.
//       if (loan_info !== 0) {
//
//         // replace the placeholders with the response values.
//         const output_content = options.response_basic
//             .replace("%payment_amount%", formatNumber(loan_info.payment_amount_formatted, options))
//             .replace("%num_payments%", loan_info.num_payments)
//             .replace("%total_payments%", formatNumber(loan_info.total_payments_formatted, options))
//             .replace("%total_interest%", formatNumber(loan_info.total_interest_formatted, options));
//
//         // output the content to the actual output element.
//         output_elem.html(output_content);
//
//       } else {
//
//         // if the values for the loan calculation aren't valid, provide an error.
//         output_elem.html(options.error_text);
//       }
//
//       // run the callback function after the calculation is done, including
//       // the calculation info so it's available in the callback.
//       options.callback(elem, loan_info);
//     };
// // compares two different loans to determine savings in interest.
//     const calculateComparison = function (elem, options, output_elem) {
//
//       // see if there's a comparison term
//       let term_compare = get_field(elem, options, "term_compare");
//
//       // if the comparison term is empty, use the normal term field
//       if (typeof (term_compare) == "boolean") {
//         term_compare = get_field(elem, options, "term");
//       }
//
//       // Get information about the two different loans in question
//       // and create a callback data variable that we'll pass into
//       // our callback function.
//       const loan_1_info = $.loanInfo({
//             amount: get_field(elem, options, "amount"),
//             rate: get_field(elem, options, "rate"),
//             term: get_field(elem, options, "term")
//           }),
//           loan_2_info = $.loanInfo({
//             amount: get_field(elem, options, "amount"),
//             rate: get_field(elem, options, "rate_compare"),
//             term: term_compare
//           }),
//           callback_data = {
//             loan_1: loan_1_info,
//             loan_2: loan_2_info
//           };
//
//       // If both loans are good, populate response element with info,
//       // else error.
//       if (loan_1_info !== 0 && loan_2_info !== 0) {
//         if (loan_1_info.total_interest - loan_2_info.total_interest > 0) {
//           callback_data.savings = loan_1_info.total_interest - loan_2_info.total_interest;
//         } else {
//           callback_data.savings = 0;
//         }
//
//         // replace our savings placeholder in the response text with
//         // the real difference in interest.
//         const output_content = options.response_compare
//             .replace("%savings%", formatNumber(callback_data.savings.toFixed(2), options))
//             .replace("%loan_1_payment_amount%", formatNumber(loan_2_info.payment_amount_formatted, options))
//             .replace("%loan_1_num_payments%", loan_2_info.num_payments)
//             .replace("%loan_1_total_payments%", loan_2_info.total_payments_formatted)
//             .replace("%loan_1_total_interest%", formatNumber(loan_2_info.total_interest_formatted, options))
//             .replace("%loan_2_payment_amount%", formatNumber(loan_1_info.payment_amount_formatted, options))
//             .replace("%loan_2_num_payments%", loan_1_info.num_payments)
//             .replace("%loan_2_total_payments%", loan_1_info.total_payments_formatted)
//             .replace("%loan_2_total_interest%", formatNumber(loan_1_info.total_interest_formatted, options));
//         output_elem.html(output_content);
//
//       } else {
//
//         // output an error
//         output_elem.html(options.error_text);
//
//       }
//
//       // run the callback, passing our loan data into it.
//       options.callback(elem, callback_data);
//     };
// // for a single loan object.
//     const calculateAmortization = function (elem, options, output_elem) {
//
//       // Get the loan information so we can build out our amortization
//       // schedule table.
//       const loan_info = $.loanInfo({
//         amount: get_field(elem, options, "amount"),
//         rate: get_field(elem, options, "rate"),
//         term: get_field(elem, options, "term")
//       });
//
//       // If the loan info's good, start buildin'!
//       if (loan_info !== 0) {
//
//         // Set some initial variables for the table header, interest
//         // per payment, amount from balance, and counter variables
//         // to values as we list rows.
//         let output_content = '<table className="accrue-amortization">' +
//             '<thead><tr>' +
//             '<th className="accrue-payment-number">#</th>' +
//             '<th className="accrue-payment-amount">Payment Amt.</th>' +
//             '<th className="accrue-total-interest">Total Interest</th>' +
//             '<th className="accrue-total-payments">Total Payments</th>' +
//             '<th className="accrue-balance">Balance</th>' +
//             '</tr></thead><tbody>',
//             interest_per_payment = loan_info.payment_amount - (loan_info.original_amount / loan_info.num_payments),
//             amount_from_balance = loan_info.payment_amount - interest_per_payment,
//             counter_interest = 0,
//             counter_payment = 0,
//             counter_balance = parseInt(loan_info.original_amount, 10);
//
//         // Start appending the table rows to our output variable.
//         for (let i = 0; i < loan_info.num_payments; i++) {
//
//           // Record the payment in our counter variables.
//           counter_interest = counter_interest + interest_per_payment;
//           counter_payment = counter_payment + loan_info.payment_amount;
//           counter_balance = counter_balance - amount_from_balance;
//
//           // bold the last row of the table by using <th>s for
//           // the values.
//           let cell_tag = "td";
//           if (i === (loan_info.num_payments - 1)) {
//             cell_tag = "th";
//           }
//
//           // Append a row to the table
//           output_content = output_content +
//               '<tr>' +
//               '<' + cell_tag + ' className="accrue-payment-number">' + (i + 1) + '</' + cell_tag + '>' +
//               '<' + cell_tag + ' className="accrue-payment-amount">' + formatNumber(loan_info.payment_amount_formatted, options) + '</' + cell_tag + '>' +
//               '<' + cell_tag + ' className="accrue-total-interest">' + formatNumber(counter_interest.toFixed(2), options) + '</' + cell_tag + '>' +
//               '<' + cell_tag + ' className="accrue-total-payments">' + formatNumber(counter_payment.toFixed(2), options) + '</' + cell_tag + '>' +
//               '<' + cell_tag + ' className="accrue-balance">' + formatNumber(counter_balance.toFixed(2), options) + '</' + cell_tag + '>' +
//               '</tr>';
//         }
//
//         // Finish off our table tag.
//         output_content = output_content +
//             '</tbody></table>';
//
//         // Push our output content into the output element.
//         output_elem.html(output_content);
//       } else {
//
//         // Values aren't good yet, show the error.
//         output_elem.html(options.error_text);
//       }
//
//       // Execute callback, passing in loan information.
//       options.callback(elem, loan_info);
//     };
// // let's start our plugin logic
//     $.extend($.fn, {
//       accrue: function (options) {
//
//         // set our options from the defaults, overriding with the
//         // parameter we pass into this function.
//         options = $.extend({calculationMethod: calculateBasic}, $.fn.accrue.options, options);
//
//         // Iterate through all the matching elements and return
//         // the jquery object to preserve chaining.
//         return this.each(function () {
//
//           // Store a jQuery object for our element so we can use it
//           // inside our other bindings.
//           const elem = $(this);
//
//           // Create the form div if it doesn't exist.
//           if (!elem.find(".form").length) {
//             elem.append('<div className="form"></div>');
//           }
//
//           // Get the amount, rate(s), and term - and clean the values
//           const amount = get_field(elem, options, "amount");
//           const rate = get_field(elem, options, "rate");
//           const term = get_field(elem, options, "term");
//
//           // If we're in comparison mode, grab an additiona field/value.
//           if (options.mode === "compare") {
//             const rate_compare = get_field(elem, options, "rate_compare");
//           }
//
//           // If we are using the default results div and it doesn't exist, create it.
//           let output_elem;
//           if (options.response_output_div === ".results") {
//
//             if (elem.find(".results").length === 0) {
//               elem.append('<div className="results"></div>');
//             }
//
//             // Set the output div as a variable so we can refer to it more easily.
//             output_elem = elem.find(".results");
//
//           } else {
//
//             // Set the output div as a variable so we can refer to it more easily.
//             output_elem = $(options.response_output_div);
//
//           }
//
//
//           // Set the calculation method based on which mode we're in.
//           let calculation_method;
//           switch (options.mode) {
//
//             case "basic":
//               calculation_method = calculateBasic;
//               break;
//
//             case "compare":
//               calculation_method = calculateComparison;
//               break;
//
//             case "amortization":
//               calculation_method = calculateAmortization;
//               break;
//
//           }
//
//
//           // Get the information about the loan.
//           calculation_method(elem, options, output_elem);
//
//           // Do some different things if the operation mode is "button"
//           if (options.operation === "button") {
//
//             // If we are using button operation mode and the button doesn't exist, create one.
//             if (elem.find("button").length === 0 && elem.find("input[type=submit]").length === 0 && elem.find("input[type=image]").length === 0) {
//               elem.find(".form").append('<button className="accrue-calculate">' + options.button_label + '</button>');
//             }
//
//             // If the developer has chosen to bind to a button instead
//             // of operate on keyup, let's set up a click event binding
//             // that performs the calculation.
//             elem.find("button, input[type=submit], input[type=image]").each(function () {
//               $(this).click(function (event) {
//                 event.preventDefault();
//                 calculation_method(elem, options, output_elem);
//               });
//             });
//
//           } else {
//
//             // Bind to the select and input elements so that we calculate
//             // on keyup (or change in the case of the select list).
//             elem.find("input, select").each(function () {
//               $(this).bind("keyup change", function () {
//                 calculation_method(elem, options, output_elem);
//               });
//             });
//
//           }
//
//           // If the developer has chosen to bind to a button instead
//           // of operate on keyup, let's set up a click event binding
//           // that performs the calculation.
//           elem.find("form").each(function () {
//             $(this).submit(function (event) {
//               event.preventDefault();
//               calculation_method(elem, options, output_elem);
//             });
//           });
//
//         });
//       }
//     });
//
//
//     // DEFAULTS
//     // Set up some default options for our plugin that can be overridden
//     // as needed when we actually instantiate our plugin on a form.
//     $.fn.accrue.options = {
//       mode: "basic",
//       operation: "keyup",
//       currency: "USD",
//       language: "en",
//       default_values: {
//         amount: "7,500",
//         rate: "7%",
//         rate_compare: "1.49%",
//         term: "36m"
//       },
//       field_titles: {
//         amount: "Loan Amount",
//         rate: "Rate (APR)",
//         rate_compare: "Comparison Rate",
//         term: "Term"
//       },
//       button_label: "Calculate",
//       field_comments: {
//         amount: "",
//         rate: "",
//         rate_compare: "",
//         term: "Format: 12m, 36m, 3y, 7y"
//       },
//       response_output_div: ".results",
//       response_basic:
//           '<p><strong>Monthly Payment:</strong><br />%payment_amount%</p>' +
//           '<p><strong>Number of Payments:</strong><br />%num_payments%</p>' +
//           '<p><strong>Total Payments:</strong><br />%total_payments%</p>' +
//           '<p><strong>Total Interest:</strong><br />%total_interest%</p>',
//       response_compare: '<p className="total-savings">Save %savings% in interest!</p>',
//       error_text: '<p className="error">Please fill in all fields.</p>',
//       callback: function (elem, data) {
//       }
//     };
//
//     // FORMAT MONEY
//     // This function is used to add thousand seperators to numerical ouput
//     // as a means of properly formatting money
//     function formatNumber(num, options) {
//       return new Intl.NumberFormat(options.language, {
//         style: 'currency',
//         currency: options.currency
//       }).format(num);
//     }
//
//
//     // BASIC LOGGING FUNCTION
//     // Checks to see if the console is available before outputting
//     // anything through console.log(). Prevent issues with IE.
//     const log = function (message) {
//       if (window.console) {
//         console.log(message);
//       }
//     };
//
//
//     // GENERAL LOAN INFORMATION FUNCTION
//     // This is the public function we use inside our plugin function
//     // and we're exposing it here so that we can also provide generic
//     // calculations that just return JSON objects that can be used
//     // for custom-developed plugins.
//     $.loanInfo = function (input) {
//
//       var amount = (typeof (input.amount) !== "undefined" ? input.amount : 0).toString().replace(/[^\d.]/ig, ''),
//           rate = (typeof (input.rate) !== "undefined" ? input.rate : 0).toString().replace(/[^\d.]/ig, ''),
//           term = (typeof (input.term) !== "undefined" ? input.term : 0);
//
//       // parse year values passed into the term value
//       if (term.match("y")) {
//         term = parseInt(term.replace(/[^\d.]/ig, ''), 10) * 12;
//       } else {
//         term = parseInt(term.replace(/[^\d.]/ig, ''), 10);
//       }
//
//       // process the input values
//       const monthly_interest = rate / 100 / 12;
//
//       // Now compute the monthly payment amount.
//       const x = Math.pow(1 + monthly_interest, term),
//           monthly = (amount * x * monthly_interest) / (x - 1);
//
//       // If the result is a finite number, the user's input was good and
//       // we have meaningful results to display
//       if (amount * rate * term > 0) {
//         // Fill in the output fields, rounding to 2 decimal places
//         return {
//           original_amount: amount,
//           payment_amount: monthly,
//           payment_amount_formatted: monthly.toFixed(2),
//           num_payments: term,
//           total_payments: (monthly * term),
//           total_payments_formatted: (monthly * term).toFixed(2),
//           total_interest: ((monthly * term) - amount),
//           total_interest_formatted: ((monthly * term) - amount).toFixed(2)
//         };
//       } else {
//         // The numbers provided won't provide good data as results,
//         // so we'll return 0 so it's easy to test if one of the fields
//         // is empty or invalid.
//         return 0;
//       }
//     };
//
//
//     // REVERSE LOAN INFORMATION FUNCTION
//     // This is a copy of the above, only that given a payment amount, rate and term it
//     // will return the principal amount that can be borrowed.
//     $.loanAmount = function (input) {
//
//       var payment = (typeof (input.payment) !== "undefined" ? input.payment : 0).toString().replace(/[^\d.]/ig, ''),
//           rate = (typeof (input.rate) !== "undefined" ? input.rate : 0).toString().replace(/[^\d.]/ig, ''),
//           term = (typeof (input.term) !== "undefined" ? input.term : 0);
//
//       // parse year values passed into the term value
//       if (term.match("y")) {
//         term = parseInt(term.replace(/[^\d.]/ig, ''), 10) * 12;
//       } else {
//         term = parseInt(term.replace(/[^\d.]/ig, ''), 10);
//       }
//
//       // process the input values
//       const monthly_interest = rate / 100 / 12,
//           annual_interest = rate / 100;
//
//       // Now compute.
//       const x = payment * (1 - Math.pow(1 + monthly_interest, -1 * term)) * (12 / (annual_interest));
//
//       // If the result is a finite number, the user's input was good and
//       // we have meaningful results to display
//       if (x > 0) {
//         // Fill in the output fields, rounding to 2 decimal places
//         return {
//           principal_amount: x,
//           principal_amount_formatted: (x * 1).toFixed(2),
//           payment_amount: payment,
//           payment_amount_formatted: (payment * 1).toFixed(2),
//           num_payments: term,
//           total_payments: (payment * term),
//           total_payments_formatted: (payment * term).toFixed(2),
//           total_interest: ((payment * term) - x),
//           total_interest_formatted: ((payment * term) - x).toFixed(2)
//         };
//
//       } else {
//         // The numbers provided won't provide good data as results,
//         // so we'll return 0 so it's easy to test if one of the fields
//         // is empty or invalid.
//         return 0;
//       }
//     };
//
//   })
//   ($, window, document);
//
//   return (
//       <main>
//         <Paper>
//           <section id="demos">
//             <div className="container">
//               <div className="tabs">
//                 <a className="tab tab-1 active" href="#" data-tab="basic-cal">Basic Calculation</a>
//                 <a className="tab tab-2" href="#" data-tab="2">Interest Calculation</a>
//                 <a className="tab tab-3" href="#" data-tab="3">Amortization Schedule Calculation</a>
//                 <span className="highlighter"/>
//               </div>
//
//               <div className="content">
//                 <div className="content__section visible" data-tab="basic-cal">
//                     <div className="wrap">
//                       <h2>Basic Loan Calculation</h2>
//                       <div className="forty">
//                         <p>Grabs three values from the form, and returns general information about a loan.</p></div>
//
//                       <div className="calculator-loan">
//                         <div className="thirty form">
//                           <div className="accrue-field-amount">
//                             <p>
//                               <label>Loan Amount:</label>
//                               <input type="text"
//                                      className="amount"
//                                      value="7,500" />
//                               </p>
//                           </div>
//
//                           <div className="accrue-field-rate">
//                             <p>
//                               <label>Rate (APR):</label>
//                               <input type="text"
//                                      className="rate"
//                                      value="7%"/>
//                             </p>
//                           </div>
//                           <div className="accrue-field-term">
//                             <p>
//                               <label>Term:</label>
//                               <input type="text"
//                                      className="term"
//                                       value="36m"/>
//                               <small>Format: 12m, 36m, 3y, 7y</small>
//                             </p>
//                           </div>
//                         </div>
//                         <div className="thirty">
//                           <p><label>Results:</label></p>
//                           <div className="results"/>
//                         </div>
//                       </div>
//                       <div className="clear"/>
//                     </div>
//                 </div>
//
//                 <div className="content__section" data-tab="2">
//                   <div className="wrap">
//
//                     <h2>Interest Savings Calculation</h2>
//
//                     <div className="forty">
//                       <p>Grabs four values from the form, and returns general information about a loan.</p>
//                     </div>
//
//                     <div className="calculator-compare">
//                       <div className="thirty form">
//                         <div className="accrue-field-amount">
//                           <p><label>Loan Amount:</label>
//                             <input type="text" className="amount" value="7,500"/>
//                           </p>
//                         </div>
//                         <div className="accrue-field-rate">
//                           <p><label>Rate (APR):</label>
//                             <input type="text" className="rate" value="7%"/>
//                           </p>
//                         </div>
//                         <div className="accrue-field-term">
//                           <p><label>Term:</label>
//                             <input type="text" className="term" value="36m"/>
//                             <small>Format: 12m, 36m, 3y, 7y</small>
//                           </p>
//                         </div>
//                         <div className="accrue-field-rate_compare">
//                           <p>
//                             <label>Comparison Rate:</label>
//                             <input type="text" className="rate_compare" value="1.49%"/>
//                           </p>
//                         </div>
//                       </div>
//
//                       <div className="thirty">
//                         <p><label>Results:</label></p>
//                         <div className="results"/>
//                       </div>
//
//                       <div className="clear"/>
//                     </div>
//                   </div>
//                 </div>
//
//                 <div className="content__section" data-tab="3">
//                   <div className="wrap">
//
//                     <h2>Amortization Schedule Calculation</h2>
//
//                     <div className="fifty">
//                       <p>Grabs three values from the form, and displays a complete amortization schedule for the
//                         provided loan information.</p>
//                     </div>
//
//                     <div className="calculator-amortization">
//                       <div className="thirty form">
//                         <div className="accrue-field-amount">
//                           <p><label>Loan Amount:</label>
//                             <input type="text" className="amount" value="7,500"/>
//                           </p>
//                         </div>
//                         <div className="accrue-field-rate">
//                           <p>
//                             <label>Rate (APR):</label>
//                             <input type="text" className="rate" value="7%"/>
//                           </p>
//                         </div>
//                         <div className="accrue-field-term">
//                           <p>
//                             <label>Term:</label>
//                             <input type="text" className="term" value="36m"/>
//                             <small>Format: 12m, 36m, 3y, 7y</small>
//                           </p>
//                         </div>
//                       </div>
//                       <div className="seventy">
//                         <p>
//                           <label>Results:</label>
//                         </p>
//                         <div className="results">
//                           <table className="accrue-amortization">
//                             <thead>
//                               <tr>
//                                 <th className="accrue-payment-number">#</th>
//                                 <th className="accrue-payment-amount">Payment Amt.</th>
//                                 <th className="accrue-total-interest">Total Interest</th>
//                                 <th className="accrue-total-payments">Total Payments</th>
//                                 <th className="accrue-balance">Balance</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
//                               <td className="accrue-payment-number">1</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$23.24</td>
//                               <td className="accrue-total-payments">$231.58</td>
//                               <td className="accrue-balance">$7,291.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">2</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$46.49</td>
//                               <td className="accrue-total-payments">$463.16</td>
//                               <td className="accrue-balance">$7,083.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">3</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$69.73</td>
//                               <td className="accrue-total-payments">$694.73</td>
//                               <td className="accrue-balance">$6,875.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">4</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$92.98</td>
//                               <td className="accrue-total-payments">$926.31</td>
//                               <td className="accrue-balance">$6,666.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">5</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$116.22</td>
//                               <td className="accrue-total-payments">$1,157.89</td>
//                               <td className="accrue-balance">$6,458.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">6</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$139.47</td>
//                               <td className="accrue-total-payments">$1,389.47</td>
//                               <td className="accrue-balance">$6,250.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">7</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$162.71</td>
//                               <td className="accrue-total-payments">$1,621.05</td>
//                               <td className="accrue-balance">$6,041.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">8</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$185.96</td>
//                               <td className="accrue-total-payments">$1,852.63</td>
//                               <td className="accrue-balance">$5,833.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">9</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$209.20</td>
//                               <td className="accrue-total-payments">$2,084.20</td>
//                               <td className="accrue-balance">$5,625.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">10</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$232.45</td>
//                               <td className="accrue-total-payments">$2,315.78</td>
//                               <td className="accrue-balance">$5,416.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">11</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$255.69</td>
//                               <td className="accrue-total-payments">$2,547.36</td>
//                               <td className="accrue-balance">$5,208.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">12</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$278.94</td>
//                               <td className="accrue-total-payments">$2,778.94</td>
//                               <td className="accrue-balance">$5,000.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">13</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$302.18</td>
//                               <td className="accrue-total-payments">$3,010.52</td>
//                               <td className="accrue-balance">$4,791.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">14</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$325.43</td>
//                               <td className="accrue-total-payments">$3,242.10</td>
//                               <td className="accrue-balance">$4,583.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">15</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$348.67</td>
//                               <td className="accrue-total-payments">$3,473.67</td>
//                               <td className="accrue-balance">$4,375.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">16</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$371.92</td>
//                               <td className="accrue-total-payments">$3,705.25</td>
//                               <td className="accrue-balance">$4,166.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">17</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$395.16</td>
//                               <td className="accrue-total-payments">$3,936.83</td>
//                               <td className="accrue-balance">$3,958.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">18</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$418.41</td>
//                               <td className="accrue-total-payments">$4,168.41</td>
//                               <td className="accrue-balance">$3,750.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">19</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$441.65</td>
//                               <td className="accrue-total-payments">$4,399.99</td>
//                               <td className="accrue-balance">$3,541.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">20</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$464.90</td>
//                               <td className="accrue-total-payments">$4,631.56</td>
//                               <td className="accrue-balance">$3,333.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">21</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$488.14</td>
//                               <td className="accrue-total-payments">$4,863.14</td>
//                               <td className="accrue-balance">$3,125.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">22</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$511.39</td>
//                               <td className="accrue-total-payments">$5,094.72</td>
//                               <td className="accrue-balance">$2,916.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">23</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$534.63</td>
//                               <td className="accrue-total-payments">$5,326.30</td>
//                               <td className="accrue-balance">$2,708.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">24</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$557.88</td>
//                               <td className="accrue-total-payments">$5,557.88</td>
//                               <td className="accrue-balance">$2,500.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">25</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$581.12</td>
//                               <td className="accrue-total-payments">$5,789.46</td>
//                               <td className="accrue-balance">$2,291.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">26</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$604.37</td>
//                               <td className="accrue-total-payments">$6,021.03</td>
//                               <td className="accrue-balance">$2,083.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">27</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$627.61</td>
//                               <td className="accrue-total-payments">$6,252.61</td>
//                               <td className="accrue-balance">$1,875.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">28</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$650.86</td>
//                               <td className="accrue-total-payments">$6,484.19</td>
//                               <td className="accrue-balance">$1,666.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">29</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$674.10</td>
//                               <td className="accrue-total-payments">$6,715.77</td>
//                               <td className="accrue-balance">$1,458.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">30</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$697.35</td>
//                               <td className="accrue-total-payments">$6,947.35</td>
//                               <td className="accrue-balance">$1,250.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">31</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$720.59</td>
//                               <td className="accrue-total-payments">$7,178.93</td>
//                               <td className="accrue-balance">$1,041.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">32</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$743.84</td>
//                               <td className="accrue-total-payments">$7,410.50</td>
//                               <td className="accrue-balance">$833.33</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">33</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$767.08</td>
//                               <td className="accrue-total-payments">$7,642.08</td>
//                               <td className="accrue-balance">$625.00</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">34</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$790.33</td>
//                               <td className="accrue-total-payments">$7,873.66</td>
//                               <td className="accrue-balance">$416.67</td>
//                             </tr>
//                             <tr>
//                               <td className="accrue-payment-number">35</td>
//                               <td className="accrue-payment-amount">$231.58</td>
//                               <td className="accrue-total-interest">$813.57</td>
//                               <td className="accrue-total-payments">$8,105.24</td>
//                               <td className="accrue-balance">$208.33</td>
//                             </tr>
//                             <tr>
//                               <th className="accrue-payment-number">36</th>
//                               <th className="accrue-payment-amount">$231.58</th>
//                               <th className="accrue-total-interest">$836.82</th>
//                               <th className="accrue-total-payments">$8,336.82</th>
//                               <th className="accrue-balance">$0.00</th>
//                             </tr>
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//
//                       <div className="clear"/>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </Paper>
//       </main>
//   )
// }
import "../../style.scss";
import React from 'react';
import {Tabs, TabList, Tab, PanelList, Panel} from "react-tabtab";
import customStyle from '../TabStyles';
import BasicForm from "../BasicForm/BasicCalculation";
import InterestForm from "../InterestForm/InterestForm";
import AmortizationForm from "../AmortizationForm/AmortizationForm";
import {Section, SectionTitle} from "./style";

export default function App(){
  return (
      <div className="App">
          <Section>
            <SectionTitle>Calculation Demos</SectionTitle>
              <Tabs customStyle={customStyle} >
                  <TabList>
                    <Tab>Basic Loan Calculation</Tab>
                    <Tab>Interest Savings Calculation</Tab>
                    <Tab>Amortization Schedule Calculation</Tab>
                  </TabList>
                  <PanelList>
                    <Panel>
                      <BasicForm />
                    </Panel>
                    <Panel>
                     <InterestForm/>
                    </Panel>
                    <Panel>
                      <AmortizationForm />
                    </Panel>
                  </PanelList>
              </Tabs>
          </Section>
      </div>
  )
}
