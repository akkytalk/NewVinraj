import React from "react";
import rights2 from "../Components/User&Pass/rights2";
import Layout from "../layout/Layout";

const Dashboard = React.lazy(() =>
  import("../Components/Dashboard/DashboardLayout")
);
const UserMaster = React.lazy(() =>
  import("../Components/User&Pass/UserMaster")
);

const Department = React.lazy(() =>
  import("../Components/Master/PrefixMaster/Department/Department")
);
const PrefixForm = React.lazy(() =>
  import("../Components/Master/PrefixMaster/Form/PrefixForm")
);
const Prefix = React.lazy(() =>
  import("../Components/Master/PrefixMaster/Prefix/NewPrefix")
);
const AccountName = React.lazy(() =>
  import("../Components/Master/AccountMaster/AccountName/AccountName")
);
const AccountGroup = React.lazy(() =>
  import("../Components/Master/AccountMaster/AccountGroup/AccountGroup")
);
const ItemName = React.lazy(() =>
  import("../Components/Master/ItemMaster/ItemName/ItemName")
);
const ItemGroup = React.lazy(() =>
  import("../Components/Master/ItemMaster/ItemGroup/ItemGroup")
);
const ItemUnits = React.lazy(() =>
  import("../Components/Master/ItemMaster/ItemUnits/ItemUnits")
);
const Purchase = React.lazy(() => import("../Components/Purchase/Purchase"));

const EquipmentValidationReport = React.lazy(() =>
  import("../Components/Maintaince/EquipmentValidationReport")
);

const PreventiveMaintenancePlan = React.lazy(() =>
  import("../Components/Maintaince/PreventiveMaintenancePlan")
);

const MachineryAndEquipmentMmanualList = React.lazy(() =>
  import("../Components/Maintaince/MachineryAndEquipmentMmanualList")
);

const BreakdownMaintenance = React.lazy(() =>
  import("../Components/Maintaince/BreakdownMaintenance")
);

const ListOfSuppliersForMaintenanceActivities = React.lazy(() =>
  import("../Components/Maintaince/ListOfSuppliersForMaintenanceActivities")
);

const MaintenanceCleanlinessChecklist = React.lazy(() =>
  import("../Components/Maintaince/MaintenanceCleanlinessChecklist")
);

const PreventiveMaintenanceSchedule = React.lazy(() =>
  import("../Components/Maintaince/PreventiveMaintenanceSchedule")
);

const PreventiveMaintenanceRecord = React.lazy(() =>
  import("../Components/Maintaince/PreventiveMaintenanceRecord")
);

const PreventiveMaintenanceAnalysisReport = React.lazy(() =>
  import("../Components/Maintaince/PreventiveMaintenanceAnalysisReport")
);

const BreakdownMaintenanceRecord = React.lazy(() =>
  import("../Components/Maintaince/BreakdownMaintenanceRecord")
);

const BreakdownMaintenanceAnalysisRecord = React.lazy(() =>
  import("../Components/Maintaince/BreakdownMaintenanceAnalysisRecord")
);

const ProductionPlanningCf = React.lazy(() =>
  import("../Components/Production/ProductionPlanningCf")
);

const ProductionReportCf = React.lazy(() =>
  import("../Components/Production/ProductionReportCf")
);

const StockReportCf = React.lazy(() =>
  import("../Components/Production/StockReportCf")
);

const ProcessParametersCf = React.lazy(() =>
  import("../Components/Production/ProcessParametersCf")
);

const ProductionPlanningVf = React.lazy(() =>
  import("../Components/Production/ProductionPlanningVf")
);

const ProductionReportVf = React.lazy(() =>
  import("../Components/Production/ProductionReportVf")
);

const StockReportVf = React.lazy(() =>
  import("../Components/Production/StockReportVf")
);

const SuppilierPerformanceMonitiringRecord = React.lazy(() =>
  import("../Components/Purchase/SuppilierPerformanceMonitiringRecord")
);

const AuthorizedSupplierList = React.lazy(() =>
  import("../Components/Purchase/AuthorizedSupplierList")
);

const IncomingMaterialTestingRecord = React.lazy(() =>
  import("../Components/QMS/IncomingMaterialTestingRecord")
);

const CustomerComplaintRecord = React.lazy(() =>
  import("../Components/QMS/CustomerComplaintRecord")
);

const CustomerComplaintReport = React.lazy(() =>
  import("../Components/QMS/CustomerComplaintReport")
);

const Capa = React.lazy(() => import("../Components/QMS/Capa"));

const ProductionMa = React.lazy(() => import("../Components/QMS/ProductionMa"));

const EnquiryForm = React.lazy(() => import("../Components/Sales/EnquiryForm"));

const CustomerRegistrationForm = React.lazy(() =>
  import("../Components/Sales/CustomerRegistrationForm")
);

const Quotation = React.lazy(() => import("../Components/Sales/Quotation"));

const SalesTargetPlanVsActual = React.lazy(() =>
  import("../Components/Sales/SalesTargetPlanVsActual")
);

const CustomerFeedback = React.lazy(() =>
  import("../Components/Sales/CustomerFeedback")
);

const FeasibilityReport = React.lazy(() =>
  import("../Components/Sales/FeasibilityReport")
);

const PurchaseRequisition = React.lazy(() =>
  import("../Components/Stores/PurchaseRequisition")
);

const IncomingMaterialInspectionChecklist = React.lazy(() =>
  import("../Components/Stores/IncomingMaterialInspectionChecklist")
);

const StockRegister = React.lazy(() =>
  import("../Components/Stores/StockRegister")
);

const ListOfShelfLifeOfItems = React.lazy(() =>
  import("../Components/Stores/PurchaseRequisition")
);

const RecordOfDisposalOfShelfOfItems = React.lazy(() =>
  import("../Components/Stores/RecordOfDisposalOfShelfOfItems")
);

const userRoutes = [
  { path: "/", exact: true, name: "Home", component: Layout },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  //   {
  //     path: "/user-master",
  //     exact: true,
  //     name: "UserMasters",
  //     component: UserMaster,
  //   },
  { path: "/department", exact: true, name: "Options", component: Department },
  { path: "/form", exact: true, name: "Marking", component: PrefixForm },
  { path: "/prefix", exact: true, name: "Run", component: Prefix },
  { path: "/right", exact: true, name: "Run", component: rights2 },
  { path: "/account-name", exact: true, name: "Users", component: AccountName },
  {
    path: "/account-group",
    exact: true,
    name: "Faculty",
    component: AccountGroup,
  },
  { path: "/item-name", exact: true, name: "Results", component: ItemName },
  { path: "/item-group", exact: true, name: "Category", component: ItemGroup },
  {
    path: "/item-units",
    exact: true,
    name: "SubCategory",
    component: ItemUnits,
  },

  //  maintentaince start
  {
    path: "/preventive-maintenance-plan",
    exact: true,
    name: "PreventiveMaintenancePlan",
    component: PreventiveMaintenancePlan,
  },
  {
    path: "/equipment-validation-report",
    exact: true,
    name: "EquipmentValidationReport",
    component: EquipmentValidationReport,
  },

  {
    path: "/machinery-and-equipment-manual-list",
    exact: true,
    name: "MachineryAndEquipmentMmanualList",
    component: MachineryAndEquipmentMmanualList,
  },

  {
    path: "/breakdown-maintenance",
    exact: true,
    name: "BreakdownMaintenance",
    component: BreakdownMaintenance,
  },
  {
    path: "/list-of-suppliers-for-maintenance-activities",
    exact: true,
    name: "ListOfSuppliersForMaintenanceActivities",
    component: ListOfSuppliersForMaintenanceActivities,
  },
  {
    path: "/maintenance-cleanliness-checklist",
    exact: true,
    name: "MaintenanceCleanlinessChecklist",
    component: MaintenanceCleanlinessChecklist,
  },

  {
    path: "/preventive-maintenance-schedule",
    exact: true,
    name: "PreventiveMaintenanceSchedule",
    component: PreventiveMaintenanceSchedule,
  },

  {
    path: "/preventive-maintenance-record",
    exact: true,
    name: "PreventiveMaintenanceRecord",
    component: PreventiveMaintenanceRecord,
  },

  {
    path: "/preventive-maintenance-analysis-report",
    exact: true,
    name: "PreventiveMaintenanceAnalysisReport",
    component: PreventiveMaintenanceAnalysisReport,
  },

  {
    path: "/breakdown-maintenance-record",
    exact: true,
    name: "BreakdownMaintenanceRecord",
    component: BreakdownMaintenanceRecord,
  },

  {
    path: "/breakdown-maintenance-analysis-record",
    exact: true,
    name: "BreakdownMaintenanceAnalysisRecord",
    component: BreakdownMaintenanceAnalysisRecord,
  },

  {
    path: "/breakdown-maintenance-record",
    exact: true,
    name: "BreakdownMaintenanceRecord",
    component: BreakdownMaintenanceRecord,
  },
  //  maintentaince  end

  //  Production Start
  {
    path: "/production-planning-cf",
    exact: true,
    name: "ProductionPlanningCf",
    component: ProductionPlanningCf,
  },

  {
    path: "/production-report-cf",
    exact: true,
    name: "ProductionReportCf",
    component: ProductionReportCf,
  },

  {
    path: "/stock-report-cf",
    exact: true,
    name: "StockReportCf",
    component: StockReportCf,
  },
  {
    path: "/stock-record-vf",
    exact: true,
    name: "StockReportVf",
    component: StockReportVf,
  },

  {
    path: "/process-parameters-cf",
    exact: true,
    name: "ProcessParametersCf",
    component: ProcessParametersCf,
  },

  {
    path: "/production-planning-vf",
    exact: true,
    name: "ProductionPlanningVf",
    component: ProductionPlanningVf,
  },

  {
    path: "/production-report-vf",
    exact: true,
    name: "ProductionReportVf",
    component: ProductionReportVf,
  },

  // Production end

  // purchase start

  {
    path: "/authorized-supplier-list",
    exact: true,
    name: "AuthorizedSupplierList",
    component: AuthorizedSupplierList,
  },
  {
    path: "/purchase-requition",
    exact: true,
    name: "Purchase",
    component: Purchase,
  },
  {
    path: "/suppilier-performance-monitiring-record",
    exact: true,
    name: "SuppilierPerformanceMonitiringRecord",
    component: SuppilierPerformanceMonitiringRecord,
  },

  // purchase end

  // QMS start

  {
    path: "/incoming-material-testing-record",
    exact: true,
    name: "IncomingMaterialTestingRecord",
    component: IncomingMaterialTestingRecord,
  },

  {
    path: "/customer-complaint-record",
    exact: true,
    name: "CustomerComplaintRecord",
    component: CustomerComplaintRecord,
  },

  {
    path: "/customer-complaint-report",
    exact: true,
    name: "CustomerComplaintReport",
    component: CustomerComplaintReport,
  },

  {
    path: "/capa",
    exact: true,
    name: "Capa",
    component: Capa,
  },

  {
    path: "/production-ma",
    exact: true,
    name: "ProductionMa",
    component: ProductionMa,
  },

  // Qms End

  // sale start
  {
    path: "/enquiry-form",
    exact: true,
    name: "EnquiryForm",
    component: EnquiryForm,
  },
  {
    path: "/customer-registration-form",
    exact: true,
    name: "CustomerRegistrationForm",
    component: CustomerRegistrationForm,
  },

  {
    path: "/quotation",
    exact: true,
    name: "Quotation",
    component: Quotation,
  },

  {
    path: "/sales-target-plan-vs-actual",
    exact: true,
    name: "SalesTargetPlanVsActual",
    component: SalesTargetPlanVsActual,
  },

  {
    path: "/customer-feedback",
    exact: true,
    name: "CustomerFeedback",
    component: CustomerFeedback,
  },

  {
    path: "/feasibility-report",
    exact: true,
    name: "FeasibilityReport",
    component: FeasibilityReport,
  },
  // sale end

  // Store start

  {
    path: "/purchase-requisition",
    exact: true,
    name: "PurchaseRequisition",
    component: PurchaseRequisition,
  },

  {
    path: "/incoming-material-inspection-checklist",
    exact: true,
    name: "IncomingMaterialInspectionChecklist",
    component: IncomingMaterialInspectionChecklist,
  },

  {
    path: "/stock-register",
    exact: true,
    name: "StockRegister",
    component: StockRegister,
  },

  {
    path: "/list-of-shelf-life-of-items",
    exact: true,
    name: "ListOfShelfLifeOfItems",
    component: ListOfShelfLifeOfItems,
  },

  {
    path: "/record-of-disposal-of-shelf-of-items",
    exact: true,
    name: "RecordOfDisposalOfShelfOfItems",
    component: RecordOfDisposalOfShelfOfItems,
  },
  // store end
];

export default userRoutes;
