angular.module('bhima.services')
.service('PatientInvoiceItemService', PatientInvoiceItemService);

PatientInvoiceItemService.$inject = [ 'uuid' ];

/**
 * @class PatientInvoiceItemService
 *
 * @description
 * This class implements the defaults for a patient invoice item.  It implements
 * a single method, `validate()`, to determine whether the item is valid or not.
 */
function PatientInvoiceItemService(uuid) {

  /**
   * @constructor
   *
   * @description
   * Sets up the default values for the invoice item.  Optionally takes in an
   * inventory item to preconfigure the invoice item, otherwise, it will be
   * set later.
   *
   * @param {Object} inventoryItem - an inventory item to use as the inventory
   * line.
   */
  function PatientInvoiceItem(inventoryItem) {

    // defaults
    this.confirmed = false;
    this.priceListApplied = false;
    this.uuid = uuid();

    // if inventoryItem exists, call the configure method right away
    if (inventoryItem) {
      this.configure(inventoryItem);
    }
  }

  /**
   * @method validate
   *
   * @description
   * Validation for single PatientInvoiceItem.  This is a prototype method since
   * we are expecting to create potentially many items in an invoice.
   *
   * @returns {Boolean} - the validity of the current item.  True is the item is
   * valid, false if it is not.
   */
  PatientInvoiceItem.prototype.validate = function validate() {
    var item = this;

    // ensure the numbers are valid in the invoice
    var hasValidNumbers = angular.isNumber(item.quantity) &&
      angular.isNumber(item.transaction_price) &&
      item.quantity > 0 &&
      item.transaction_price >= 0;

    // item must be confirmed
    var isConfirmed = item.confirmed;

    // alias both valid and invalid for sy
    item.valid = isConfirmed && hasValidNumbers;
    item.invalid = !item.valid;

    // return the boolean
    return item.valid;
  };

  /**
   * @method configure
   *
   * @description
   * This method configures the PatientInvoiceItem with an inventory item.
   */
  PatientInvoiceItem.prototype.configure = function configure(inventoryItem) {
    this.quantity = 1;
    this.code = inventoryItem.code;
    this.description = inventoryItem.label;
    this.transaction_price = inventoryItem.price;
    this.inventory_price = inventoryItem.price;
    this.inventory_uuid = inventoryItem.uuid;
    this.confirmed = true;
  };

  return PatientInvoiceItem;
}
