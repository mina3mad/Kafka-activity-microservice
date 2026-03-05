export class ActivityLogRepository {

// Save a new activity log
// returns {Promise<string>}
  async save(activityLog) {
    throw new Error("save() must be implemented");
  }

   
// Get activity log by id
// @param {string} id
// returns {Promise<ActivityLog>}   
  async findById(id) {
     throw new Error('Not implemented'); 
    }


//   Get all activity logs with filters + pagination
//    @queryparams {Object}
//    queryParams example:
//    {
//      page,
//      limit,
//      sort,
//      fields,
//      search,
//      action,
//      createdat,
//     }
   
//     returns {Promise<{data:ActivityLog[],total:number,page:number,limit:number}>}
  async findAll() {
    throw new Error("findAll() must be implemented");
  }
}