angular.module('bhima.controllers')
  .controller('FeeCenterController', FeeCenterController);

FeeCenterController.$inject = [
  'FeeCenterService', 'ModalService',
  'NotifyService', 'uiGridConstants', '$state',
];

/**
 * Fee Center Controller
 *
 * This controller is about the Fee Center module in the admin zone
 * It's responsible for creating, editing and updating a Fee Center
 */
function FeeCenterController(FeeCenters, ModalService,
  Notify, uiGridConstants, $state) {
  const vm = this;

  // bind methods
  vm.deleteFeeCenter = deleteFeeCenter;
  vm.createFeeCenter = createFeeCenter;
  vm.toggleFilter = toggleFilter;

  // global variables
  vm.gridApi = {};
  vm.filterEnabled = false;

  // options for the UI grid
  vm.gridOptions = {
    appScopeProvider  : vm,
    enableColumnMenus : false,
    fastWatch         : true,
    flatEntityAccess  : true,
    enableSorting     : true,
    onRegisterApi     : onRegisterApiFn,
    columnDefs : [
      { field : 'label', displayName : 'FORM.LABELS.DESIGNATION', headerCellFilter : 'translate' },
      {
        field : 'is_principal',
        displayName : '',
        headerCellFilter : 'translate',
        enableFiltering : false,
        enableSorting : false,
        cellTemplate : '/modules/fee_center/templates/feeCenterType.tmpl.html',
      },
      {
        field : 'action',
        width : 80,
        displayName : '',
        cellTemplate : '/modules/fee_center/templates/action.tmpl.html',
        enableSorting : false,
        enableFiltering : false,
      },
    ],
  };

  function onRegisterApiFn(gridApi) {
    vm.gridApi = gridApi;
  }

  function toggleFilter() {
    vm.filterEnabled = !vm.filterEnabled;
    vm.gridOptions.enableFiltering = vm.filterEnabled;
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  }

  function loadFeeCenters() {
    vm.loading = true;

    FeeCenters.read()
      .then((data) => {
        vm.gridOptions.data = data;
      })
      .catch(Notify.handleError)
      .finally(() => {
        vm.loading = false;
      });
  }

  // switch to delete warning mode
  function deleteFeeCenter(feeCenter) {
    ModalService.confirm('FORM.DIALOGS.CONFIRM_DELETE')
      .then((bool) => {
        if (!bool) { return; }

        FeeCenters.delete(feeCenter.id)
          .then(() => {
            Notify.success('FORM.INFO.DELETE_SUCCESS');
            loadFeeCenters();
          })
          .catch(Notify.handleError);
      });
  }

  // create a new FeeCenter
  function createFeeCenter() {
    $state.go('fee_center.create');
  }

  loadFeeCenters();
}
