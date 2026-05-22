const Visitor = require("../models/visitorModels");

const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "Unknown IP"
  );
};

exports.trackVisit = async (req, res) => {
  try {
    const ipAddress = getClientIp(req);
    const browser = req.headers["user-agent"] || "Unknown Browser";
    const page = req.body.page || "/";

    const visitor = await Visitor.findOneAndUpdate(
      { ipAddress, browser },
      {
        $set: {
          page,
          lastVisitedAt: new Date(),
        },
        $inc: {
          visitCount: 1,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      visitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unable to track visitor",
    });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ lastVisitedAt: -1 });

    const totalVisits = visitors.reduce(
      (sum, visitor) => sum + visitor.visitCount,
      0
    );

    res.status(200).json({
      visitors,
      uniqueVisitors: visitors.length,
      totalVisits,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Unable to load visitors",
    });
  }
};