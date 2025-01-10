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
import { orderDetailContoller } from './controllers/orderDetailController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { orderController } from './controllers/orderController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { fruitController } from './controllers/fruitController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { employeeController } from './controllers/employeeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { customerController } from './controllers/customerController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { categoryController } from './controllers/categoryController';
import { expressAuthentication } from './auth';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "SearchSupplier": {
        "dataType": "refObject",
        "properties": {
            "FirstName": {"dataType":"string","required":true},
            "LastName": {"dataType":"string","required":true},
            "Email": {"dataType":"string","required":true},
            "UserName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Suppliers": {
        "dataType": "refObject",
        "properties": {
            "Title": {"dataType":"string","required":true},
            "FirstName": {"dataType":"string","required":true},
            "LastName": {"dataType":"string","required":true},
            "Email": {"dataType":"string","required":true},
            "UserName": {"dataType":"string","required":true},
            "Phone": {"dataType":"string","required":true},
            "Address": {"dataType":"string","required":true},
            "City": {"dataType":"string","required":true},
            "Country": {"dataType":"string","required":true},
            "PostalCode": {"dataType":"string","required":true},
            "Notes": {"dataType":"string","required":true},
            "Photo": {"dataType":"string","required":true},
            "Password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Produucts": {
        "dataType": "refObject",
        "properties": {
            "categoryId": {"dataType":"string","required":true},
            "discontinued": {"dataType":"boolean","required":true},
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
    "OrderDetail": {
        "dataType": "refObject",
        "properties": {
            "Discount": {"dataType":"double","required":true},
            "ProductId": {"dataType":"string","required":true},
            "Quantity": {"dataType":"double","required":true},
            "UnitPrice": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Orders": {
        "dataType": "refObject",
        "properties": {
            "CustomerUserName": {"dataType":"string","required":true},
            "EmployeeUserName": {"dataType":"string","required":true},
            "OrderDate": {"dataType":"string","required":true},
            "TotalPrice": {"dataType":"double","required":true},
            "Address": {"dataType":"string","required":true},
            "State": {"dataType":"string","required":true},
            "OrderDetail": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderDetail"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderDetailUpdate": {
        "dataType": "refObject",
        "properties": {
            "Discount": {"dataType":"double","required":true},
            "ProductId": {"dataType":"string","required":true},
            "Quantity": {"dataType":"double","required":true},
            "UnitPrice": {"dataType":"string","required":true},
            "Id": {"dataType":"string"},
            "OrderId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrdersUpdate": {
        "dataType": "refObject",
        "properties": {
            "CustomerId": {"dataType":"string","required":true},
            "EmployeeId": {"dataType":"string","required":true},
            "OrderDate": {"dataType":"string","required":true},
            "TotalPrice": {"dataType":"double","required":true},
            "Address": {"dataType":"string","required":true},
            "State": {"dataType":"string","required":true},
            "OrderDetail": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderDetailUpdate"},"required":true},
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
    "SearchEmployees": {
        "dataType": "refObject",
        "properties": {
            "UserName": {"dataType":"string","required":true},
            "Email": {"dataType":"string","required":true},
            "FirstName": {"dataType":"string","required":true},
            "LastName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Employees": {
        "dataType": "refObject",
        "properties": {
            "Title": {"dataType":"string","required":true},
            "FirstName": {"dataType":"string","required":true},
            "LastName": {"dataType":"string","required":true},
            "BirthDate": {"dataType":"string","required":true},
            "Email": {"dataType":"string","required":true},
            "UserName": {"dataType":"string","required":true},
            "Address": {"dataType":"string","required":true},
            "City": {"dataType":"string","required":true},
            "Country": {"dataType":"string","required":true},
            "PostalCode": {"dataType":"string","required":true},
            "Notes": {"dataType":"string","required":true},
            "Photo": {"dataType":"string","required":true},
            "PhotoPath": {"dataType":"string","required":true},
            "Password": {"dataType":"string","required":true},
            "RoleUser": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchCustomers": {
        "dataType": "refObject",
        "properties": {
            "UserName": {"dataType":"string","required":true},
            "Email": {"dataType":"string","required":true},
            "FirstName": {"dataType":"string","required":true},
            "LastName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Customers": {
        "dataType": "refObject",
        "properties": {
            "Title": {"dataType":"string","required":true},
            "FirstName": {"dataType":"string","required":true},
            "LastName": {"dataType":"string","required":true},
            "BirthDate": {"dataType":"string","required":true},
            "Email": {"dataType":"string","required":true},
            "UserName": {"dataType":"string","required":true},
            "Address": {"dataType":"string","required":true},
            "City": {"dataType":"string","required":true},
            "Country": {"dataType":"string","required":true},
            "PostalCode": {"dataType":"string","required":true},
            "Notes": {"dataType":"string","required":true},
            "Photo": {"dataType":"string","required":true},
            "PhotoPath": {"dataType":"string","required":true},
            "Role": {"dataType":"string","required":true},
            "Password": {"dataType":"string","required":true},
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


    
        const argssupplierController_getSupplier: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SearchSupplier"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/Supplier/chaeckSupplier',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(supplierController)),
            ...(fetchMiddlewares<RequestHandler>(supplierController.prototype.getSupplier)),

            async function supplierController_getSupplier(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argssupplierController_getSupplier, request, response });

                const controller = new supplierController();

              await templateService.apiHandler({
                methodName: 'getSupplier',
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Suppliers"},
        };
        app.post('/Supplier',
            authenticateMiddleware([{"keycloak":[]}]),
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.patch('/Supplier/:id',
            authenticateMiddleware([{"keycloak":[]}]),
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/Supplier/:id',
            authenticateMiddleware([{"keycloak":[]}]),
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
        const argsproductController_getProductAll: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/Product',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(productController)),
            ...(fetchMiddlewares<RequestHandler>(productController.prototype.getProductAll)),

            async function productController_getProductAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsproductController_getProductAll, request, response });

                const controller = new productController();

              await templateService.apiHandler({
                methodName: 'getProductAll',
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
        const argsproductController_getProductById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/Product/:id',
            ...(fetchMiddlewares<RequestHandler>(productController)),
            ...(fetchMiddlewares<RequestHandler>(productController.prototype.getProductById)),

            async function productController_getProductById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsproductController_getProductById, request, response });

                const controller = new productController();

              await templateService.apiHandler({
                methodName: 'getProductById',
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/Product',
            authenticateMiddleware([{"keycloak":[]}]),
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.patch('/Product/:id',
            authenticateMiddleware([{"keycloak":[]}]),
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/Product/:id',
            authenticateMiddleware([{"keycloak":[]}]),
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
        const argsorderDetailContoller_deleteOrderDetail: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/OrderDetail/:id',
            ...(fetchMiddlewares<RequestHandler>(orderDetailContoller)),
            ...(fetchMiddlewares<RequestHandler>(orderDetailContoller.prototype.deleteOrderDetail)),

            async function orderDetailContoller_deleteOrderDetail(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsorderDetailContoller_deleteOrderDetail, request, response });

                const controller = new orderDetailContoller();

              await templateService.apiHandler({
                methodName: 'deleteOrderDetail',
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
        const argsorderController_getOrderAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Order',
            ...(fetchMiddlewares<RequestHandler>(orderController)),
            ...(fetchMiddlewares<RequestHandler>(orderController.prototype.getOrderAll)),

            async function orderController_getOrderAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsorderController_getOrderAll, request, response });

                const controller = new orderController();

              await templateService.apiHandler({
                methodName: 'getOrderAll',
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
        const argsorderController_getOrderById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/Order/:id',
            ...(fetchMiddlewares<RequestHandler>(orderController)),
            ...(fetchMiddlewares<RequestHandler>(orderController.prototype.getOrderById)),

            async function orderController_getOrderById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsorderController_getOrderById, request, response });

                const controller = new orderController();

              await templateService.apiHandler({
                methodName: 'getOrderById',
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
        const argsorderController_createOrder: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Orders"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/Order',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(orderController)),
            ...(fetchMiddlewares<RequestHandler>(orderController.prototype.createOrder)),

            async function orderController_createOrder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsorderController_createOrder, request, response });

                const controller = new orderController();

              await templateService.apiHandler({
                methodName: 'createOrder',
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
        const argsorderController_updateOrder: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"OrdersUpdate"},
        };
        app.patch('/Order/:id',
            ...(fetchMiddlewares<RequestHandler>(orderController)),
            ...(fetchMiddlewares<RequestHandler>(orderController.prototype.updateOrder)),

            async function orderController_updateOrder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsorderController_updateOrder, request, response });

                const controller = new orderController();

              await templateService.apiHandler({
                methodName: 'updateOrder',
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
        const argsemployeeController_getEmployee: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SearchEmployees"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/Employee/chaeckEmployee',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(employeeController)),
            ...(fetchMiddlewares<RequestHandler>(employeeController.prototype.getEmployee)),

            async function employeeController_getEmployee(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsemployeeController_getEmployee, request, response });

                const controller = new employeeController();

              await templateService.apiHandler({
                methodName: 'getEmployee',
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/Employee',
            authenticateMiddleware([{"keycloak":[]}]),
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.patch('/Employee/:id',
            authenticateMiddleware([{"keycloak":[]}]),
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/Employee/:id',
            authenticateMiddleware([{"keycloak":[]}]),
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
        const argscustomerController_getCustomer: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SearchCustomers"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/Customer/chaeckCustomer',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(customerController)),
            ...(fetchMiddlewares<RequestHandler>(customerController.prototype.getCustomer)),

            async function customerController_getCustomer(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscustomerController_getCustomer, request, response });

                const controller = new customerController();

              await templateService.apiHandler({
                methodName: 'getCustomer',
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
        const argscustomerController_getCustomerAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Customer',
            ...(fetchMiddlewares<RequestHandler>(customerController)),
            ...(fetchMiddlewares<RequestHandler>(customerController.prototype.getCustomerAll)),

            async function customerController_getCustomerAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscustomerController_getCustomerAll, request, response });

                const controller = new customerController();

              await templateService.apiHandler({
                methodName: 'getCustomerAll',
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
        const argscustomerController_getCustomerById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/Customer/:id',
            ...(fetchMiddlewares<RequestHandler>(customerController)),
            ...(fetchMiddlewares<RequestHandler>(customerController.prototype.getCustomerById)),

            async function customerController_getCustomerById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscustomerController_getCustomerById, request, response });

                const controller = new customerController();

              await templateService.apiHandler({
                methodName: 'getCustomerById',
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
        const argscustomerController_createCustomer: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Customers"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/Customer',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(customerController)),
            ...(fetchMiddlewares<RequestHandler>(customerController.prototype.createCustomer)),

            async function customerController_createCustomer(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscustomerController_createCustomer, request, response });

                const controller = new customerController();

              await templateService.apiHandler({
                methodName: 'createCustomer',
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
        const argscustomerController_updateCustomer: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Customers"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.patch('/Customer/:id',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(customerController)),
            ...(fetchMiddlewares<RequestHandler>(customerController.prototype.updateCustomer)),

            async function customerController_updateCustomer(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscustomerController_updateCustomer, request, response });

                const controller = new customerController();

              await templateService.apiHandler({
                methodName: 'updateCustomer',
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
        const argscustomerController_deleteCustomer: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/Customer/:id',
            authenticateMiddleware([{"keycloak":[]}]),
            ...(fetchMiddlewares<RequestHandler>(customerController)),
            ...(fetchMiddlewares<RequestHandler>(customerController.prototype.deleteCustomer)),

            async function customerController_deleteCustomer(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argscustomerController_deleteCustomer, request, response });

                const controller = new customerController();

              await templateService.apiHandler({
                methodName: 'deleteCustomer',
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/Category',
            authenticateMiddleware([{"keycloak":[]}]),
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.patch('/Category/:id',
            authenticateMiddleware([{"keycloak":[]}]),
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
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/Category/:id',
            authenticateMiddleware([{"keycloak":[]}]),
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
