import angular from "angular";
import template from "./columnForm.html";

const app = angular.module("app.columnForm", []);

const Controller = function () {
	const $ctrl = this;

	$ctrl.columnTypes = [
		{ name: 'DATE', type: 'DATE' },
		{ name: 'FLOAT', type: 'FLOAT' },
		{ name: 'VARCHAR(n)', type: 'VARCHAR(n)' },
		{ name: 'CHAR(n)', type: 'CHAR(n)' },
		{ name: 'INT', type: 'INT' }
	];

	$ctrl.cancel = () => {
		$ctrl.dismiss();
	};

	$ctrl.selectType = function (selected) {
		if (!$ctrl.column.PK && !$ctrl.column.FK) {
			$ctrl.column.type = selected.type;
		} else {
			$ctrl.column.type = "INT";
		}
	}
	$ctrl.checkLgpd = function (location){
		let current = 2;
		while (current >=0){
			if(current>location && !$ctrl.column.lgpd[location]){
				$ctrl.column.lgpd[current]=false;
			}
			if(current<location && $ctrl.column.lgpd[location]){
				$ctrl.column.lgpd[current]=true;
			}
			current--;
		}
	}

	$ctrl.selectTableOrigin = function (selected) {
		$ctrl.column.tableOrigin.idName = selected.name;
	}
};

export default app.component("columnForm", {
	template: template,
	bindings: {
		save: "<",
		dismiss: "&",
		column: "<",
		index: "<",
		tableNames: "<",
		delete: "<"
	},
	controller: Controller,
}).name;
