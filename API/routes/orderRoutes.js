import { Router } from "express";
export const router = Router();

import {catchAsyncErrors} from '../middleware/errorMiddleware';
import {userAuthorize,ownerAuthorize} from '../middleware/userAuth';

import {add,changeToFinalised,changeToInDelivery,
  changeToInProgress,getMyTodaysOrders,remove,getAllOrders} from '../controllers/orderController';

router.post('/order/add',
catchAsyncErrors(userAuthorize),
catchAsyncErrors(add));

router.put('/order/changeToInProgress',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(changeToInProgress));

router.put('/order/changeToInDelivery',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(changeToInDelivery));

router.put('/order/changeToFinalised',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(changeToFinalised));

router.post('/order/getMyTodaysOrders',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(getMyTodaysOrders));

router.delete('/order/remove',
catchAsyncErrors(remove));

router.post('/order/getAllOrders',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(getAllOrders));
