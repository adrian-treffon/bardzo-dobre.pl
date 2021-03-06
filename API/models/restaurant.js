import mongoose from 'mongoose';
import {Order} from "./order";

var Schema = mongoose.Schema;

const  RestaurantSchema = new Schema({
    name: {type: String, required: [true,"Name is required"]},
    address: {type: String,required: [true,"Address is required"]},
    description: {type: String,required: [true,"Description is required"]},
    ownerID: {type: Schema.Types.ObjectId,required:[true,"Owner's id is required"]},
    open :{type: Boolean, required:true, default:true},
    permamentlyClosed : {type: Boolean, required:true, default:false}
},{versionKey: false});

RestaurantSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.permamentlyClosed;
  return obj;
 };

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export async function create(req){

  const restaurant = await Restaurant.findOne({
    name : req.body.name,
    ownerID: req.session.user_sid
  });

  if (restaurant) throw new Error("Restaurant already exists");

  await new Restaurant({
    name : req.body.name,
    address : req.body.address,
    description : req.body.description,
    ownerID: req.decoded.id
  }).save();
}

export async function remove(req){

  const restaurant = await Restaurant.findById(req.body._id);
  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(restaurant.open) throw new Error("Cannot remove opened restaurant");

  const orders = await Order.find({restaurantID : restaurant._id});
  orders.forEach(order => {
    if(order.state !== "Finalised")
    throw new Error("You cannot remove restaurant with orders in progress");
  });

  restaurant.set('permamentlyClosed',true);
  restaurant.set('open',false);
  await restaurant.save();
}

export async function search(req){
   return await Restaurant.find(
   {
   address: {$regex: req.body.address, $options: 'i'},
   permamentlyClosed : false}
   );
}

export async function get(req){

  const restaurant = await Restaurant.findById(req.body.restaurantID);

  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(restaurant.permamentlyClosed) throw new Error("Restaurant is permamently closed");
  
  return restaurant;
}

export async function open(req)
{
  const restaurant = await Restaurant.findById(req.body.restaurantID);

  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(restaurant.open) throw new Error("Restaurant is already open");
  if(restaurant.permamentlyClosed) throw new Error("Restaurant is permamently closed");

  restaurant.open = true;
  await restaurant.save();
}

export async function close(req)
{
  const restaurant = await Restaurant.findById(req.body.restaurantID);

  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(!restaurant.open) throw new Error("Restaurant is already closed");

  const orders = await Order.find({restaurantID : restaurant._id, 
  orderedAt : new Date().toLocaleDateString()});

  orders.forEach(order => {
    if(order.state !== "Finalised")
    throw new Error("You cannot close the restaurant with orders in progress");
  });

  restaurant.open = false;
  await restaurant.save();
}