const express =require('express')
const router=express.Router()
const Asset=require('./asset.mdoel')



router.get("/total",async(req,res)=>{

try{
    const total = await Asset.countDocuments();
    const laptops = await Asset.countDocuments({ type: 'laptop' });
    const desktops = await Asset.countDocuments({ type: 'desktop' });
    const workstations = await Asset.countDocuments({ type: 'workstation' });
    const totaldata={
        total, laptops,desktops,workstations
    }

    res.status(200).json({msg:"Retireved All Assets count",data:{totaldata}})

}
catch(e){
    res.status(500).json({error:"Internal server error",data:{totaldata}})
}
    

})

router.get("/status",async(req,res)=>{
    try{
        const statuses = ['in_use', 'available', 'repair', 'in_transit', 'delivered', 'recycle', 'ready_to_retire'];
      const statusCounts={}
      for (const status of statuses) {
        statusCounts[status] = await Asset.countDocuments({ status });
      }
        res.status(200).json({msg:"Retireved status All Assets",data:{statusCounts}})
    
    }
    catch(e){
        res.status(500).json({ error: 'Internal server error' });
    }
      
    
})
    
router.get("/warrantyExpired",async(req,res)=>{
    try{
        const currentDate = new Date();
              const expireedAllAssets =await Asset.countDocuments({warranty_end_date:{$lt:currentDate}})
              const expiredLaptops = await Asset.countDocuments({ type: 'laptop', warranty_end_date: { $lt: currentDate } });
              const expiredDesktops = await Asset.countDocuments({ type: 'desktop', warranty_end_date: { $lt: currentDate } });
             const expiredWorkstations = await Asset.countDocuments({ type: 'workstation', warranty_end_date: { $lt: currentDate } });

            
                res.status(200).json({msg:"Expored Assets",data:{expireedAllAssets,expiredLaptops,expiredDesktops,expiredWorkstations}})
    
    }
    catch(e){
        res.status(500).json({ error: 'Internal server error' });
    }
       
})

router.get("/Allassets",async(req,res)=>{
                try{
                    const assets = await Asset.find();
                    res.status(200).json({msg:"Expored Assets",data:assets})
                }
                catch(e){
                    res.status(500).json({ error: 'Internal server error' });
                }
                
                       
})

router.post("/addbulkAsset", async (req, res) => {
    try {
      const assets = req.body; // Expecting an array of assets
      if (!Array.isArray(assets) || assets.length === 0) {
        return res.status(400).json({ message: "Invalid input. Provide an array of assets." });
      }
  
      // Insert multiple assets into the database
      const createdAssets = await Asset.insertMany(assets);
  
      res.status(201).json({
        message: "Assets created successfully",
        createdAssets,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  })

  router.get('/insights', async (req, res) => {
    try {
      const total = await Asset.countDocuments();
      const laptops = await Asset.countDocuments({ type: 'laptop' });
      const desktops = await Asset.countDocuments({ type: 'desktop' });
      const workstations = await Asset.countDocuments({ type: 'workstation' });
  
      const statuses = ['in_use', 'available', 'repair', 'in_transit', 'delivered', 'recycle', 'ready_to_retire'];
      const statusCounts = {};
      for (const status of statuses) {
        statusCounts[status] = await Asset.countDocuments({ status });
      }
  
      const currentDate = new Date();
      const totalExpired = await Asset.countDocuments({ warranty_end_date: { $lt: currentDate } });
      const expiredLaptops = await Asset.countDocuments({ type: 'laptop', warranty_end_date: { $lt: currentDate } });
      const expiredDesktops = await Asset.countDocuments({ type: 'desktop', warranty_end_date: { $lt: currentDate } });
      const expiredWorkstations = await Asset.countDocuments({ type: 'workstation', warranty_end_date: { $lt: currentDate } });
  
      //const assets = await Asset.find();
  
      res.json({
        summary: {
          total,
          laptops,
          desktops,
          workstations,
        },
        status_distribution: statusCounts,
        warranty: {
          total_expired: totalExpired,
          expired_laptops: expiredLaptops,
          expired_desktops: expiredDesktops,
          expired_workstations: expiredWorkstations,
        },
        
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports=router