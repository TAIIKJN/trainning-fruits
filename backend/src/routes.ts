/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { supplierController } from './controllers/supplierController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { productController } from './controllers/productController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { fruitController } from './controllers/fruitController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { employeeController } from './controllers/employeeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { categoryController } from './controllers/categoryController';
import { expressAuthentication } from './auth';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Suppliers": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "companyName": {"dataType":"string","required":true},
            "contactName": {"dataType":"string","required":true},
            "contactTitle": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "fax": {"dataType":"string","required":true},
            "homePage": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "postalCode": {"dataType":"string","required":true},
            "region": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Produucts": {
        "dataType": "refObject",
        "properties": {
            "categoryId": {"dataType":"string","required":true},
            "discontinued": {"dataType":"double","required":true},
            "productName": {"dataType":"string","required":true},
            "quantityPerUnit": {"dataType":"string","required":true},
            "reorderLevel": {"dataType":"double","required":true},
            "supplierId": {"dataType":"string","required":true},
            "unitPrice": {"dataType":"string","required":true},
            "unitsInStock": {"dataType":"double","required":true},
            "unitsOnOrder": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Fruits": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Employees": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "birthDate": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "extension": {"dataType":"string","required":true},
            "firstName": {"dataType":"string","required":true},
            "hireDate": {"dataType":"string","required":true},
            "homePhone": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "notes": {"dataType":"string","required":true},
            "photo": {"dataType":"string","required":true},
            "photoPath": {"dataType":"string","required":true},
            "postalCode": {"dataType":"string","required":true},
            "region": {"dataType":"string","required":true},
            "reportsTo": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "titleOfCourtesy": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Categorys": {
        "dataType": "refObject",
        "properties": {
            "categoryName": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argssupplierController_getSupplierAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Supplier',
            ...(fetchMiddlewares<RequestHandler>(supplierController)),
            ...(fetchMiddlewares<RequestHandler>(supplierController.prototype.getSupplierAll)),

            async function supplierController_getSupplierAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argssupplierController_getSupplierAll, request, response });

                const controller = new supplierController();

              await templateService.apiHandler({
                methodName: 'getSupplierAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argssupplierController_getSupplierById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/Supplier/:id',
            ...(fetchMiddlewares<RequestHandler>(supplierController)),
            ...(fetchMiddlewares<RequestHandler>(supplierController.prototype.getSupplierById)),

            async function supplierController_getSupplierById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argssupplierController_getSupplierById, request, response });

                const controller = new supplierController();

              await templateService.apiHandler({
                methodName: 'getSupplierById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argssupplierController_createSupplier: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Suppliers"},
        };
        app.post('/Supplier',
            ...(fetchMiddlewares<RequestHandler>(supplierController)),
            ...(fetchMiddlewares<RequestHandler>(supplierController.prototype.createSupplier)),

            async function supplierController_createSupplier(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argssupplierController_createSupplier, request, response });

                const controller = new supplierController();

              await templateService.apiHandler({
                methodName: 'createSupplier',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argssupplierController_updateSupplier: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Suppliers"},
        };
        app.patch('/Supplier/:id',
            ...(fetchMiddlewares<RequestHandler>(supplierController)),
            ...(fetchMiddlewares<RequestHandler>(supplierController.prototype.updateSupplier)),

            async function supplierController_updateSupplier(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argssupplierController_updateSupplier, request, response });

                const controller = new supplierController();

              await templateService.apiHandler({
                methodName: 'updateSupplier',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argssupplierController_deleteSupplier: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/Supplier/:id',
            ...(fetchMiddlewares<RequestHandler>(supplierController)),
            ...(fetchMiddlewares<RequestHandler>(supplierController.prototype.deleteSupplier)),

            async function supplierController_deleteSupplier(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argssupplierController_deleteSupplier, request, response });

                const controller = new supplierController();

              await templateService.apiHandler({
                methodName: 'deleteSupplier',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsproductController_getProduuctAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Product',
            ...(fetchMiddlewares<RequestHandler>(productController)),
            ...(fetchMiddlewares<RequestHandler>(productController.prototype.getProduuctAll)),

            async function productController_getProduuctAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsproductController_getProduuctAll, request, response });

                const controller = new productController();

              await templateService.apiHandler({
                methodName: 'getProduuctAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsproductController_createProduuct: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Produucts"},
        };
        app.post('/Product',
            ...(fetchMiddlewares<RequestHandler>(productController)),
            ...(fetchMiddlewares<RequestHandler>(productController.prototype.createProduuct)),

            async function productController_createProduuct(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsproductController_createProduuct, request, response });

                const controller = new productController();

              await templateService.apiHandler({
                methodName: 'createProduuct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsproductController_updataProduuct: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Produucts"},
        };
        app.patch('/Product/:id',
            ...(fetchMiddlewares<RequestHandler>(productController)),
            ...(fetchMiddlewares<RequestHandler>(productController.prototype.updataProduuct)),

            async function productController_updataProduuct(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsproductController_updataProduuct, request, response });

                const controller = new productController();

              await templateService.apiHandler({
                methodName: 'updataProduuct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsproductController_deleteProduct: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/Product/:id',
            ...(fetchMiddlewares<RequestHandler>(productController)),
            ...(fetchMiddlewares<RequestHandler>(productController.prototype.deleteProduct)),

            async function productController_deleteProduct(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsproductController_deleteProduct, request, response });

                const controller = new productController();

              await templateService.apiHandler({
                methodName: 'deleteProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsfruitController_getFruit: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/fruits',
            ...(fetchMiddlewares<RequestHandler>(fruitController)),
            ...(fetchMiddlewares<RequestHandler>(fruitController.prototype.getFruit)),

            async function fruitController_getFruit(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsfruitController_getFruit, request, response });

                const controller = new fruitController();

              await templateService.apiHandler({
                methodName: 'getFruit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsfruitController_getFruitById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/fruits/:id',
            ...(fetchMiddlewares<RequestHandler>(fruitController)),
            ...(fetchMiddlewares<RequestHandler>(fruitController.prototype.getFruitById)),

            async function fruitController_getFruitById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsfruitController_getFruitById, request, response });

                const controller = new fruitController();

              await templateService.apiHandler({
                methodName: 'getFruitById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsfruitController_createFruit: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Fruits"},
        };
        app.post('/fruits',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(fruitController)),
            ...(fetchMiddlewares<RequestHandler>(fruitController.prototype.createFruit)),

            async function fruitController_createFruit(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsfruitController_createFruit, request, response });

                const controller = new fruitController();

              await templateService.apiHandler({
                methodName: 'createFruit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsfruitController_updateFruit: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Fruits"},
        };
        app.patch('/fruits/:id',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(fruitController)),
            ...(fetchMiddlewares<RequestHandler>(fruitController.prototype.updateFruit)),

            async function fruitController_updateFruit(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsfruitController_updateFruit, request, response });

                const controller = new fruitController();

              await templateService.apiHandler({
                methodName: 'updateFruit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsfruitController_deleteFruit: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/fruits/:id',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(fruitController)),
            ...(fetchMiddlewares<RequestHandler>(fruitController.prototype.deleteFruit)),

            async function fruitController_deleteFruit(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsfruitController_deleteFruit, request, response });

                const controller = new fruitController();

              await templateService.apiHandler({
                methodName: 'deleteFruit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsemployeeController_getEmployeeAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Employee',
            ...(fetchMiddlewares<RequestHandler>(employeeController)),
            ...(fetchMiddlewares<RequestHandler>(employeeController.prototype.getEmployeeAll)),

            async function employeeController_getEmployeeAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsemployeeController_getEmployeeAll, request, response });

                const controller = new employeeController();

              await templateService.apiHandler({
                methodName: 'getEmployeeAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsemployeeController_getEmployeeById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/Employee/:id',
            ...(fetchMiddlewares<RequestHandler>(employeeController)),
            ...(fetchMiddlewares<RequestHandler>(employeeController.prototype.getEmployeeById)),

            async function employeeController_getEmployeeById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsemployeeController_getEmployeeById, request, response });

                const controller = new employeeController();

              await templateService.apiHandler({
                methodName: 'getEmployeeById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsemployeeController_createEmployee: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Employees"},
        };
        app.post('/Employee',
            ...(fetchMiddlewares<RequestHandler>(employeeController)),
            ...(fetchMiddlewares<RequestHandler>(employeeController.prototype.createEmployee)),

            async function employeeController_createEmployee(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsemployeeController_createEmployee, request, response });

                const controller = new employeeController();

              await templateService.apiHandler({
                methodName: 'createEmployee',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsemployeeController_updateEmployee: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Employees"},
        };
        app.patch('/Employee/:id',
            ...(fetchMiddlewares<RequestHandler>(employeeController)),
            ...(fetchMiddlewares<RequestHandler>(employeeController.prototype.updateEmployee)),

            async function employeeController_updateEmployee(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsemployeeController_updateEmployee, request, response });

                const controller = new employeeController();

              await templateService.apiHandler({
                methodName: 'updateEmployee',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsemployeeController_deleteEmployee: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/Employee/:id',
            ...(fetchMiddlewares<RequestHandler>(employeeController)),
            ...(fetchMiddlewares<RequestHandler>(employeeController.prototype.deleteEmployee)),

            async function employeeController_deleteEmployee(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsemployeeController_deleteEmployee, request, response });

                const controller = new employeeController();

              await templateService.apiHandler({
                methodName: 'deleteEmployee',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argscategoryController_getCategoryAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Category',
            ...(fetchMiddlewares<RequestHandler>(categoryController)),
            ...(fetchMiddlewares<RequestHandler>(categoryController.prototype.getCategoryAll)),

            async function categoryController_getCategoryAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscategoryController_getCategoryAll, request, response });

                const controller = new categoryController();

              await templateService.apiHandler({
                methodName: 'getCategoryAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argscategoryController_createCategory: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Categorys"},
        };
        app.post('/Category',
            ...(fetchMiddlewares<RequestHandler>(categoryController)),
            ...(fetchMiddlewares<RequestHandler>(categoryController.prototype.createCategory)),

            async function categoryController_createCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscategoryController_createCategory, request, response });

                const controller = new categoryController();

              await templateService.apiHandler({
                methodName: 'createCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argscategoryController_updataCategory: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Categorys"},
        };
        app.patch('/Category/:id',
            ...(fetchMiddlewares<RequestHandler>(categoryController)),
            ...(fetchMiddlewares<RequestHandler>(categoryController.prototype.updataCategory)),

            async function categoryController_updataCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscategoryController_updataCategory, request, response });

                const controller = new categoryController();

              await templateService.apiHandler({
                methodName: 'updataCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argscategoryController_deleteCategory: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/Category/:id',
            ...(fetchMiddlewares<RequestHandler>(categoryController)),
            ...(fetchMiddlewares<RequestHandler>(categoryController.prototype.deleteCategory)),

            async function categoryController_deleteCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscategoryController_deleteCategory, request, response });

                const controller = new categoryController();

              await templateService.apiHandler({
                methodName: 'deleteCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
