import { Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import AccountGroup from "./Components/Master/AccountMaster/AccountGroup/AccountGroup";
import AccountName from "./Components/Master/AccountMaster/AccountName/AccountName";
import ItemGroup from "./Components/Master/ItemMaster/ItemGroup/ItemGroup";
import ItemName from "./Components/Master/ItemMaster/ItemName/ItemName";
import Department from "./Components/Master/PrefixMaster/Department/Department";
import PrefixForm from "./Components/Master/PrefixMaster/Form/PrefixForm";
import Prefix from "./Components/Master/PrefixMaster/Prefix/Prefix";
import UserMaster from "./Components/User&Pass/UserMaster";

import EquipmentValidationReport from "./Components/Maintaince/EquipmentValidationReport";
import PreventiveMaintenancePlan from "./Components/Maintaince/PreventiveMaintenancePlan";
import MachineryAndEquipmentMmanualList from "./Components/Maintaince/MachineryAndEquipmentMmanualList";
import BreakdownMaintenance from "./Components/Maintaince/BreakdownMaintenance";
import ListOfSuppliersForMaintenanceActivities from "./Components/Maintaince/ListOfSuppliersForMaintenanceActivities";
import MaintenanceCleanlinessChecklist from "./Components/Maintaince/MaintenanceCleanlinessChecklist";
import PreventiveMaintenanceSchedule from "./Components/Maintaince/PreventiveMaintenanceSchedule";
import PreventiveMaintenanceRecord from "./Components/Maintaince/PreventiveMaintenanceRecord";
import PreventiveMaintenanceAnalysisReport from "./Components/Maintaince/PreventiveMaintenanceAnalysisReport";
import BreakdownMaintenanceRecord from "./Components/Maintaince/BreakdownMaintenanceRecord";
import BreakdownMaintenanceAnalysisRecord from "./Components/Maintaince/BreakdownMaintenanceAnalysisRecord";
import ProductionPlanningCf from "./Components/Production/ProductionPlanningCf";
import ProductionReportCf from "./Components/Production/ProductionReportCf";
import StockReportCf from "./Components/Production/StockReportCf";
import ProcessParametersCf from "./Components/Production/ProcessParametersCf";
import ProductionPlanningVf from "./Components/Production/ProductionPlanningVf";
import ProductionReportVf from "./Components/Production/ProductionReportVf";
import StockReportVf from "./Components/Production/StockReportVf";
import AuthorizedSupplierList from "./Components/Purchase/AuthorizedSupplierList";
import PurchaseRequition from "./Components/Purchase/PurchaseRequition";
import SuppilierPerformanceMonitiringRecord from "./Components/Purchase/SuppilierPerformanceMonitiringRecord";
import EnquiryForm from "./Components/Sales/EnquiryForm";
import CustomerRegistrationForm from "./Components/Sales/CustomerRegistrationForm";
import Quotation from "./Components/Sales/Quotation";
import SalesTargetPlanVsActual from "./Components/Sales/SalesTargetPlanVsActual";
import CustomerFeedback from "./Components/Sales/CustomerFeedback";
import FeasibilityReport from "./Components/Sales/FeasibilityReport";
import PurchaseRequisition from "./Components/Stores/PurchaseRequisition";
import IncomingMaterialInspectionChecklist from "./Components/Stores/IncomingMaterialInspectionChecklist";
import StockRegister from "./Components/Stores/StockRegister";
import ListOfShelfLifeOfItems from "./Components/Stores/ListOfShelfLifeOfItems";
import RecordOfDisposalOfShelfOfItems from "./Components/Stores/RecordOfDisposalOfShelfOfItems";
import IncomingMaterialTestingRecord from "./Components/QMS/IncomingMaterialTestingRecord";
import CustomerComplaintRecord from "./Components/QMS/CustomerComplaintRecord";
import CustomerComplaintReport from "./Components/QMS/CustomerComplaintReport";
import Capa from "./Components/QMS/Capa";
import ProductionMa from "./Components/QMS/ProductionMa";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user-master" component={UserMaster} />
          <Route path="/department" exact component={Department} />
          <Route path="/form" component={PrefixForm} />
          <Route path="/prefix" component={Prefix} />
          <Route path="/account-name" component={AccountName} />
          <Route path="/account-group" component={AccountGroup} />
          <Route path="/item-name" component={ItemName} />
          <Route path="/item-group" component={ItemGroup} />

          {/* MAINTENANCE routing start here */}
          <Route
            path="/equipment-validation-report"
            component={EquipmentValidationReport}
          />
          <Route
            path="/preventive-maintenance-plan"
            component={PreventiveMaintenancePlan}
          />
          <Route
            path="/machinery-and-equipment-manual-list"
            component={MachineryAndEquipmentMmanualList}
          />
          <Route
            path="/breakdown-maintenance"
            component={BreakdownMaintenance}
          />
          <Route
            path="/list-of-suppliers-for-maintenance-activities"
            component={ListOfSuppliersForMaintenanceActivities}
          />
          <Route
            path="/maintenance-cleanliness-checklist"
            component={MaintenanceCleanlinessChecklist}
          />
          <Route
            path="/preventive-maintenance-schedule"
            component={PreventiveMaintenanceSchedule}
          />
          <Route
            path="/preventive-maintenance-record"
            component={PreventiveMaintenanceRecord}
          />
          <Route
            path="/preventive-maintenance-analysis-report"
            component={PreventiveMaintenanceAnalysisReport}
          />
          <Route
            path="/breakdown-maintenance-record"
            component={BreakdownMaintenanceRecord}
          />
          <Route
            path="/breakdown-maintenance-analysis-record"
            component={BreakdownMaintenanceAnalysisRecord}
          />
          <Route
            path="/breakdown-maintenance-record"
            component={BreakdownMaintenanceRecord}
          />
          <Route
            path="/breakdown-maintenance-analysis-record"
            component={BreakdownMaintenanceAnalysisRecord}
          />
          {/* MAINTENANCE routing end here */}

          {/* PRODUCTION routing start here */}
          <Route
            path="/production-planning-cf"
            component={ProductionPlanningCf}
          />
          <Route path="/production-report-cf" component={ProductionReportCf} />
          <Route path="/stock-report-cf" component={StockReportCf} />
          <Route
            path="/process-parameters-cf"
            component={ProcessParametersCf}
          />
          <Route
            path="/production-planning-vf"
            component={ProductionPlanningVf}
          />
          <Route path="/production-report-vf" component={ProductionReportVf} />
          <Route path="/stock-record-vf" component={StockReportVf} />

          {/* PRODUCTION routing end here */}

          {/* PURCHASE	 routing start here */}

          <Route
            path="/authorized-supplier-list"
            component={AuthorizedSupplierList}
          />
          <Route path="/purchase-requition" component={PurchaseRequition} />
          <Route
            path="/suppilier-performance-monitiring-record"
            component={SuppilierPerformanceMonitiringRecord}
          />

          {/* PURCHASE routing end here */}

          {/* QMS routing start here */}

          <Route
            path="/incoming-material-testing-record"
            component={IncomingMaterialTestingRecord}
          />
          <Route
            path="/customer-complaint-record"
            component={CustomerComplaintRecord}
          />
          <Route
            path="/customer-complaint-report"
            component={CustomerComplaintReport}
          />
          <Route path="/capa" component={Capa} />
          <Route path="/production-ma" component={ProductionMa} />

          {/* QMS	 routing start here */}

          {/* SALES	 routing start here */}

          <Route path="/enquiry-form" component={EnquiryForm} />
          <Route
            path="/customer-registration-form"
            component={CustomerRegistrationForm}
          />
          <Route path="/quotation" component={Quotation} />
          <Route
            path="/sales-target-plan-vs-actual"
            component={SalesTargetPlanVsActual}
          />
          <Route path="/customer-feedback" component={CustomerFeedback} />
          <Route path="/feasibility-report" component={FeasibilityReport} />

          {/* SALES routing end here */}

          {/* STORES	 routing start here */}
          <Route path="/purchase-requisition" component={PurchaseRequisition} />
          <Route
            path="/incoming-material-inspection-checklist "
            component={IncomingMaterialInspectionChecklist}
          />
          <Route path="/stock-register" component={StockRegister} />
          <Route
            path="/list-of-shelf-life-of-items"
            component={ListOfShelfLifeOfItems}
          />
          <Route
            path="/record-of-disposal-of-shelf-of-items"
            component={RecordOfDisposalOfShelfOfItems}
          />

          {/* STORES	 routing end here */}
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
